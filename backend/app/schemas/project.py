from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: Optional[bool] = True


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    name: Optional[str] = None
    is_active: Optional[bool] = None


class ProjectMember(BaseModel):
    user_id: int


class ProjectInDBBase(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Project(ProjectInDBBase):
    pass


class ProjectWithMembers(Project):
    members: List[int] = []  # List of user IDs
