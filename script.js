// Función para manejar el menú móvil
/*function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Agregar evento de clic al botón de menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
    
    const nav = document.querySelector('nav');
    nav.insertBefore(mobileMenuButton, nav.firstChild);

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
});
*/
// Función para manejar el desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const jobSearchForm = document.getElementById('job-search-form');
    const jobKeywordInput = document.getElementById('job-keyword');
    const jobDepartmentSelect = document.getElementById('job-department');
    const jobList = document.getElementById('job-list');

    if (jobSearchForm) {
        jobSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const keyword = jobKeywordInput.value.toLowerCase();
            const department = jobDepartmentSelect.value.toLowerCase();

            const jobItems = jobList.querySelectorAll('.job-item');
            jobItems.forEach(function(item) {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.job-description').textContent.toLowerCase();
                const itemDepartment = item.dataset.department.toLowerCase();

                const keywordMatch = title.includes(keyword) || description.includes(keyword);
                const departmentMatch = department === '' || itemDepartment === department;

                if (keywordMatch && departmentMatch) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  }
  
  // Verificar el tema guardado al cargar la página
  document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
    }
  });