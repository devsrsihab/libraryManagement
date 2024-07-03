// Recursive function to trim whitespace from all string values
const trimValues = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      trimValues(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) => {
        if (typeof item === "string") {
          return item.trim();
        } else if (typeof item === "object" && item !== null) {
          trimValues(item);
          return item;
        }
        return item;
      });
    }
  });
};

export default trimValues