export const getTodayDateFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  
  // Months are zero-indexed (0 = January, 11 = December)
  const month = String(today.getMonth() + 1).padStart(2, '0');
  
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
