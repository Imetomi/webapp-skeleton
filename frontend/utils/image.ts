/**
 * Utility functions for handling images
 */

/**
 * Ensures an image has alt text by using the image name as a fallback
 * This follows the SEO plugin recommendation to reduce the risk of empty alt attributes
 * 
 * @param image The image object from Strapi
 * @param defaultAlt Optional default alt text if both alternativeText and name are missing
 * @returns The alt text to use for the image
 */
export const getImageAlt = (
  image: { 
    alternativeText?: string | null; 
    name?: string | null;
    caption?: string | null;
  } | null | undefined,
  defaultAlt: string = 'Image'
): string => {
  if (!image) return defaultAlt;
  
  // Use alternativeText if available
  if (image.alternativeText) return image.alternativeText;
  
  // Fall back to name if alternativeText is empty
  if (image.name) return image.name;
  
  // Fall back to caption if name is empty
  if (image.caption) return image.caption;
  
  // Use default alt text as last resort
  return defaultAlt;
};

/**
 * Gets the full URL for an image from Strapi
 * 
 * @param image The image object from Strapi
 * @returns The full URL for the image
 */
export const getImageUrl = (
  image: { url?: string | null } | null | undefined
): string => {
  if (!image || !image.url) return '';
  
  // If the URL is already absolute, return it
  if (image.url.startsWith('http')) return image.url;
  
  // Otherwise, prepend the Strapi URL
  // Use window.location.origin as fallback if in browser environment
  const strapiUrl = typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_STRAPI_API_URL || window.location.origin)
    : 'http://localhost:1337';
  
  return `${strapiUrl}${image.url}`;
}; 