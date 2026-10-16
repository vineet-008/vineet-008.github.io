// ==========================================================================
// Vineet Gautam - Portfolio Logic & Live Clock
// ==========================================================================

function updateVadodaraTime() {
  const clockElement = document.getElementById('vadodara-clock');
  if (!clockElement) return;

  const now = new Date();
  
  // Format options for Asia/Kolkata (Vadodara, Gujarat, India)
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  };

  try {
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    let hour = '';
    let minute = '';
    let second = '';
    let dayPeriod = '';

    parts.forEach(p => {
      if (p.type === 'hour') hour = p.value;
      if (p.type === 'minute') minute = p.value;
      if (p.type === 'second') second = p.value;
      if (p.type === 'dayPeriod') dayPeriod = p.value.toUpperCase();
    });

    const timeString = `${hour}:${minute}:${second} ${dayPeriod} IST`;
    clockElement.textContent = `TIME IN VADODARA, INDIA - ${timeString}`;
  } catch (e) {
    // Fallback if Intl fails
    const istOffset = 5.5 * 60 * 60 * 1000;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + istOffset);
    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockElement.textContent = `TIME IN VADODARA, INDIA - ${hours}:${minutes}:${seconds} ${ampm} IST`;
  }
}

// Initialize clock immediately and keep ticking
updateVadodaraTime();
setInterval(updateVadodaraTime, 1000);

// Setup interactive email copy
document.addEventListener('DOMContentLoaded', () => {
  const emailElements = document.querySelectorAll('.email, #copy-email');
  const toast = document.getElementById('toast');

  emailElements.forEach(el => {
    el.addEventListener('click', () => {
      const email = 'vineetgautam325@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
});
