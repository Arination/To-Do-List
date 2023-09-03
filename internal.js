// -----------------CHECKBOX EVENT LISTENER---------------
header('Content-Type: text/javascript');

document.addEventListener('DOMContentLoaded', () => {
    const checks = document.querySelectorAll('.checkbox');
    const taskp = document.querySelectorAll('.task');
  
    checks.forEach((check, index) => {
      check.addEventListener('click', (event) => {
        // Remove active class from all checkboxes
        checks.forEach(item => item.classList.remove('active'));
  
        // Get the clicked checkbox and add the "active" class
        const clickedCheckbox = event.target;
        clickedCheckbox.classList.add('active');
  
        // Get the corresponding taskp element and add the "active" class
        const correspondingTaskp = taskp[index];
        correspondingTaskp.classList.add('active');
      });
    });
  });



  