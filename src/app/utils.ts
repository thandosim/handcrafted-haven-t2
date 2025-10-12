export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

export function alertMessage(msge: string, scroll = true) {
  // create element to hold the alert
  const alert = document.createElement("div");

  alert.classList.add("alert");
  alert.innerHTML = alert.innerHTML = `<p>${msge}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    const target = e.target as HTMLElement;

    if (target.innerText === "X") {
      // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
      alert.remove();
    }
  });

  const container = document.querySelector(".container");
  if (container) {
    container.insertAdjacentElement("beforebegin", alert);
  }

  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  if (alerts) {
    alerts.forEach((alert) => {
      const main = document.querySelector("main");
      if (main) {
        main.removeChild(alert);
      }
    });
  }
}
