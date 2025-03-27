function clickRobotCheckbox() {
    const possibleTexts = [
      "I'm not a robot",
      "I am not a robot",
      "i'm not a robot",
      "i am not a robot"
    ];
  
    const elements = document.querySelectorAll("button, input[type='checkbox'], label, div, span");
  
    elements.forEach((el) => {
      if (!el) return;
  
      // Try matching text content
      const text = el.innerText || el.value || el.getAttribute("aria-label");
      if (text) {
        for (const phrase of possibleTexts) {
          if (text.toLowerCase().includes(phrase.toLowerCase())) {
            console.log("✅ Found: ", text);
            el.click();
          }
        }
      }
  
      // Try checkbox input
      if (el.type === "checkbox" && el.labels) {
        el.labels.forEach((label) => {
          if (label.innerText && possibleTexts.some((p) => label.innerText.toLowerCase().includes(p.toLowerCase()))) {
            el.checked = true;
            el.dispatchEvent(new Event("change", { bubbles: true }));
            console.log("✅ Checkbox clicked");
          }
        });
      }
    });
  }
  
  setInterval(clickRobotCheckbox, 1000); // Check every second
  