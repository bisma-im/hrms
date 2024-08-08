/**
 * Equalizes the height of all elements with the given class name.
 */
export function equalizeCardHeights(className) {
    let maxHeight = 0;
    const elements = document.querySelectorAll(`.${className}`);
  
    // First, find the maximum height
    elements.forEach(element => {
      if (element.offsetHeight > maxHeight) {
        maxHeight = element.offsetHeight;
      }
    });
  
    // Then, set all elements to this maximum height
    elements.forEach(element => {
      element.style.height = `${maxHeight}px`;
    });
  }