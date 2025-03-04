from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.db.models.user import User
from app.db.models.project import Project, project_members
from app.schemas.project import (
    Project as ProjectSchema,
    ProjectCreate,
    ProjectUpdate,
    ProjectWithMembers,
    ProjectMember,
)

router = APIRouter()


@router.get("/", response_model=List[ProjectSchema])
def read_projects(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve projects.
    """
    # Get projects where user is owner or member
    owned_projects = db.query(Project).filter(Project.owner_id == current_user.id).all()

    # Get projects where user is a member
    member_projects = (
        db.query(Project)
        .join(project_members)
        .filter(project_members.c.user_id == current_user.id)
        .all()
    )

    # Combine and deduplicate
    all_projects = list(
        {project.id: project for project in owned_projects + member_projects}.values()
    )

    return all_projects[skip : skip + limit]


@router.post("/", response_model=ProjectSchema)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new project.
    """
    project = Project(
        **project_in.dict(),
        owner_id=current_user.id,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/{project_id}", response_model=ProjectWithMembers)
def read_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get project by ID.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Check if user is owner or member
    if project.owner_id != current_user.id and current_user.id not in [
        member.id for member in project.members
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    # Get member IDs
    member_ids = [member.id for member in project.members]

    # Create response with members
    project_data = {
        k: v
        for k, v in project.__dict__.items()
        if not k.startswith("_") and k != "members"
    }
    response = ProjectWithMembers(**project_data, members=member_ids)

    return response


@router.put("/{project_id}", response_model=ProjectSchema)
def update_project(
    project_id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Only owner can update project details
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    update_data = project_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}", response_model=ProjectSchema)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Delete a project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Only owner can delete project
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    db.delete(project)
    db.commit()
    return project


@router.post("/{project_id}/members", response_model=ProjectWithMembers)
def add_project_member(
    project_id: int,
    member_in: ProjectMember,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Add a member to the project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Only owner can add members
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    # Check if user exists
    user = db.query(User).filter(User.id == member_in.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Check if user is already a member
    if user in project.members:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already a member of this project",
        )

    # Add user to project members
    project.members.append(user)
    db.add(project)
    db.commit()
    db.refresh(project)

    # Get member IDs
    member_ids = [member.id for member in project.members]

    # Create response with members
    project_data = {
        k: v
        for k, v in project.__dict__.items()
        if not k.startswith("_") and k != "members"
    }
    response = ProjectWithMembers(**project_data, members=member_ids)

    return response


@router.delete("/{project_id}/members/{user_id}", response_model=ProjectWithMembers)
def remove_project_member(
    project_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Remove a member from the project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Only owner can remove members
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Check if user is a member
    if user not in project.members:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not a member of this project",
        )

    # Remove user from project members
    project.members.remove(user)
    db.add(project)
    db.commit()
    db.refresh(project)

    # Get member IDs
    member_ids = [member.id for member in project.members]

    # Create response with members
    project_data = {
        k: v
        for k, v in project.__dict__.items()
        if not k.startswith("_") and k != "members"
    }
    response = ProjectWithMembers(**project_data, members=member_ids)

    return response
