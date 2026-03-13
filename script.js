// Variables globales
let chatOpen = false
let sideMenuOpen = false
let searchPanelOpen = false

// Datos para búsqueda
const searchData = {
  pages: [
    {
      title: "Trámites en Línea",
      url: "tramites-online.html",
      keywords: ["tramites", "documentos", "licencias", "permisos"],
    },
    { title: "Programar Cita", url: "citas.html", keywords: ["cita", "appointment", "reunion", "horario"] },
    {
      title: "Seguridad Pública",
      url: "seguridad-publica.html",
      keywords: ["policia", "seguridad", "emergencia", "bomberos"],
    },
    {
      title: "Departamento del Tesoro",
      url: "tesoro.html",
      keywords: ["impuestos", "finanzas", "presupuesto", "tesoro"],
    },
    {
      title: "Trabajos Públicos",
      url: "trabajos-publicos.html",
      keywords: ["obras", "construccion", "infraestructura", "carreteras"],
    },
    { title: "Departamento de Justicia", url: "justicia.html", keywords: ["justicia", "legal", "tribunal", "derecho"] },
    {
      title: "Salud y Servicios Humanos",
      url: "salud-servicios-humanos.html",
      keywords: ["salud", "medico", "hospital", "servicios"],
    },
    {
      title: "Relaciones Públicas",
      url: "relaciones-publicas.html",
      keywords: ["prensa", "comunicados", "noticias", "medios"],
    },
    { title: "Blogs", url: "blogs.html", keywords: ["blog", "articulos", "noticias", "publicaciones"] },
    { title: "Comunicados", url: "comunicados.html", keywords: ["comunicados", "anuncios", "avisos", "noticias"] },
    { title: "Eventos", url: "eventos.html", keywords: ["eventos", "actividades", "calendario", "fechas"] },
    {
      title: "Acciones y Programas",
      url: "acciones-programas.html",
      keywords: ["programas", "acciones", "proyectos", "iniciativas"],
    },
    {
      title: "Transparencia",
      url: "transparencia.html",
      keywords: ["transparencia", "informacion", "datos", "publico"],
    },
    {
      title: "Datos Personales",
      url: "datos-personales.html",
      keywords: ["privacidad", "datos", "personal", "proteccion"],
    },
    { title: "Contacto", url: "contacto.html", keywords: ["contacto", "telefono", "direccion", "ubicacion"] },
    {
      title: "Preguntas Frecuentes",
      url: "preguntas-frecuentes.html",
      keywords: ["faq", "preguntas", "ayuda", "dudas"],
    },
  ],
}

// Funciones del menú lateral
function toggleSideMenu() {
  const sideMenu = document.getElementById("sideMenu")
  if (sideMenuOpen) {
    closeSideMenu()
  } else {
    openSideMenu()
  }
}

function openSideMenu() {
  const sideMenu = document.getElementById("sideMenu")
  sideMenu.classList.add("active")
  document.body.style.overflow = "hidden"
  sideMenuOpen = true
}

function closeSideMenu() {
  const sideMenu = document.getElementById("sideMenu")
  sideMenu.classList.remove("active")
  document.body.style.overflow = "auto"
  sideMenuOpen = false
}

// Funciones del panel de búsqueda
function toggleSearch() {
  const searchPanel = document.getElementById("searchPanel")
  if (searchPanelOpen) {
    closeSearch()
  } else {
    openSearch()
  }
}

function openSearch() {
  const searchPanel = document.getElementById("searchPanel")
  searchPanel.classList.add("active")
  document.body.style.overflow = "hidden"
  searchPanelOpen = true

  // Focus en el input de búsqueda
  setTimeout(() => {
    document.getElementById("searchInput").focus()
  }, 300)
}

function closeSearch() {
  const searchPanel = document.getElementById("searchPanel")
  searchPanel.classList.remove("active")
  document.body.style.overflow = "auto"
  searchPanelOpen = false
}

// Función para expandir/contraer submenús
function toggleSubmenu(element) {
  const submenu = element.nextElementSibling
  const expandIcon = element.querySelector(".expand-icon")

  if (submenu.classList.contains("active")) {
    submenu.classList.remove("active")
    expandIcon.style.transform = "rotate(0deg)"
    element.classList.remove("expanded")
  } else {
    // Cerrar otros submenús
    const allSubmenus = document.querySelectorAll(".submenu.active")
    const allExpandIcons = document.querySelectorAll(".menu-item.expanded .expand-icon")
    const allExpandedItems = document.querySelectorAll(".menu-item.expanded")

    allSubmenus.forEach((sub) => sub.classList.remove("active"))
    allExpandIcons.forEach((icon) => (icon.style.transform = "rotate(0deg)"))
    allExpandedItems.forEach((item) => item.classList.remove("expanded"))

    // Abrir el submenú seleccionado
    submenu.classList.add("active")
    expandIcon.style.transform = "rotate(90deg)"
    element.classList.add("expanded")
  }
}

// Funciones de búsqueda
function performSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchTerm = searchInput.value.trim().toLowerCase()

  if (searchTerm === "") {
    showNotification("Por favor ingresa un término de búsqueda", "warning")
    return
  }

  const results = searchInData(searchTerm)
  displaySearchResults(searchTerm, results)
  closeSearch()
}

function searchFor(term) {
  document.getElementById("searchInput").value = term
  performSearch()
}

function searchInData(searchTerm) {
  const results = []

  searchData.pages.forEach((page) => {
    let score = 0

    // Buscar en el título
    if (page.title.toLowerCase().includes(searchTerm)) {
      score += 10
    }

    // Buscar en las palabras clave
    page.keywords.forEach((keyword) => {
      if (keyword.includes(searchTerm)) {
        score += 5
      }
    })

    if (score > 0) {
      results.push({ ...page, score })
    }
  })

  // Ordenar por relevancia
  return results.sort((a, b) => b.score - a.score)
}

function displaySearchResults(searchTerm, results) {
  const searchResults = document.getElementById("searchResults")
  const searchTermSpan = document.getElementById("searchTerm")
  const resultsContainer = document.getElementById("resultsContainer")

  searchTermSpan.textContent = searchTerm

  if (results.length === 0) {
    resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda o explora nuestras secciones principales.</p>
            </div>
        `
  } else {
    resultsContainer.innerHTML = results
      .map(
        (result) => `
            <div class="result-item" onclick="window.location.href='${result.url}'">
                <h3>${result.title}</h3>
                <p>Relevancia: ${result.score} puntos</p>
                <span class="result-url">${result.url}</span>
            </div>
        `,
      )
      .join("")
  }

  searchResults.style.display = "block"
  searchResults.scrollIntoView({ behavior: "smooth" })
}

function closeSearchResults() {
  document.getElementById("searchResults").style.display = "none"
}

// Event listener para búsqueda con Enter
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }
})

// Funciones para modales
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
  document.body.style.overflow = "auto"
}

// Cerrar modal al hacer clic fuera de él
window.onclick = (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// Función para cerrar alerta
function closeAlert() {
  document.getElementById("alertBanner").style.display = "none"
}

// Funciones del chat de IA
function openChat() {
  const chat = document.getElementById("aiChat")
  const floatButton = document.querySelector(".chat-float-button")

  chat.style.display = "flex"
  floatButton.style.display = "none"
  chatOpen = true
}

function toggleChat() {
  const chat = document.getElementById("aiChat")
  const floatButton = document.querySelector(".chat-float-button")

  chat.style.display = "none"
  floatButton.style.display = "flex"
  chatOpen = false
}

function sendMessage() {
  const input = document.getElementById("chatInput")
  const message = input.value.trim()

  if (message === "") return

  // Agregar mensaje del usuario
  addMessage(message, "user")
  input.value = ""

  // Simular respuesta del bot después de un breve delay
  setTimeout(() => {
    const botResponse = generateBotResponse(message)
    addMessage(botResponse, "bot")
  }, 1000)
}

function addMessage(message, sender) {
  const chatBody = document.getElementById("chatBody")
  const messageDiv = document.createElement("div")
  messageDiv.className = `chat-message ${sender}-message`

  const messageP = document.createElement("p")
  messageP.textContent = message
  messageDiv.appendChild(messageP)

  chatBody.appendChild(messageDiv)
  chatBody.scrollTop = chatBody.scrollHeight
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase()

  // Respuestas predefinidas basadas en palabras clave
  if (message.includes("buscar") || message.includes("encontrar")) {
    return "Puedes usar el buscador haciendo clic en el ícono de búsqueda en la parte superior derecha. Te ayudará a encontrar información específica en nuestro portal."
  }

  if (message.includes("menu") || message.includes("navegacion")) {
    return "Puedes acceder al menú principal haciendo clic en las tres líneas horizontales en la parte superior izquierda. Allí encontrarás todas las secciones organizadas."
  }

  if (message.includes("seguridad") || message.includes("policía")) {
    return "El Departamento de Seguridad Pública se encarga de mantener el orden y la seguridad. Puedes contactarlos al (555) 123-4567 o visitando su oficina en el centro de la ciudad."
  }

  if (message.includes("tesoro") || message.includes("impuestos") || message.includes("finanzas")) {
    return "Para asuntos relacionados con impuestos y finanzas, el Departamento del Tesoro está disponible de lunes a viernes de 8:00 AM a 5:00 PM. Teléfono: (555) 234-5678."
  }

  if (message.includes("obras") || message.includes("construcción") || message.includes("carreteras")) {
    return "El Departamento de Trabajos Públicos maneja toda la infraestructura estatal. Para reportar problemas o consultas, llama al (555) 345-6789."
  }

  if (message.includes("justicia") || message.includes("legal") || message.includes("tribunal")) {
    return "Para asuntos legales y judiciales, contacta al Departamento de Justicia. Ofrecen servicios legales y información sobre el sistema judicial."
  }

  if (message.includes("salud") || message.includes("médico") || message.includes("hospital")) {
    return "El Departamento de Salud y Servicios Humanos proporciona información sobre servicios de salud pública y programas sociales. Teléfono: (555) 456-7890."
  }

  if (message.includes("prensa") || message.includes("comunicado") || message.includes("información")) {
    return "La Oficina de Publicación y Relaciones Públicas maneja toda la comunicación oficial. Para consultas de prensa, contacta al (555) 567-8901."
  }

  if (message.includes("horario") || message.includes("horarios")) {
    return "Los horarios de atención general son de lunes a viernes de 8:00 AM a 5:00 PM. Algunos departamentos tienen horarios extendidos."
  }

  if (message.includes("cita") || message.includes("appointment")) {
    return "Para programar una cita, puedes llamar directamente al departamento correspondiente o usar nuestro sistema de citas en línea disponible en la sección de servicios."
  }

  if (message.includes("trámite") || message.includes("documento")) {
    return 'Muchos trámites se pueden realizar en línea. Visita la sección de "Servicios Rápidos" para acceder a los trámites digitales disponibles.'
  }

  if (message.includes("hola") || message.includes("buenos días") || message.includes("buenas tardes")) {
    return "¡Hola! Bienvenido al portal del Gobierno de San Andreas. ¿En qué puedo ayudarte hoy? Puedo proporcionarte información sobre nuestros departamentos y servicios."
  }

  if (message.includes("gracias")) {
    return "¡De nada! Si tienes más preguntas, no dudes en consultarme. Estoy aquí para ayudarte con cualquier información sobre el gobierno de San Andreas."
  }

  // Respuesta por defecto
  return "Gracias por tu consulta. Para obtener información específica, te recomiendo contactar directamente al departamento correspondiente o visitar nuestras oficinas. ¿Hay algo más en lo que pueda ayudarte?"
}

// Permitir enviar mensaje con Enter
document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chatInput")
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }
})

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animación de entrada para las tarjetas de departamentos
function animateOnScroll() {
  const cards = document.querySelectorAll(".department-card")
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
}

// Inicializar animaciones cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll()

  // Mostrar mensaje de bienvenida en el chat después de 3 segundos
  setTimeout(() => {
    if (!chatOpen) {
      const floatButton = document.querySelector(".chat-float-button")
      floatButton.style.animation = "pulse 2s infinite"
    }
  }, 3000)
})

// Función para mostrar notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `

  // Estilos para la notificación
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : type === "warning" ? "#ff9800" : "#2196f3"};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `

  document.body.appendChild(notification)

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Cerrar menús al hacer clic fuera
document.addEventListener("click", (event) => {
  // Cerrar menú lateral si se hace clic fuera
  if (sideMenuOpen && !event.target.closest(".side-menu-content") && !event.target.closest(".menu-toggle")) {
    closeSideMenu()
  }

  // Cerrar panel de búsqueda si se hace clic fuera
  if (searchPanelOpen && !event.target.closest(".search-panel-content") && !event.target.closest(".search-toggle")) {
    closeSearch()
  }
})

// Cerrar menús con tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (sideMenuOpen) {
      closeSideMenu()
    }
    if (searchPanelOpen) {
      closeSearch()
    }
  }
})

// Función para manejar formularios (si se agregan en el futuro)
function handleFormSubmission(formData) {
  // Simular envío de formulario
  showNotification("Formulario enviado correctamente", "success")
}

// Función para cargar contenido dinámico de Google Drive/Docs
function loadGoogleContent(modalId, documentId) {
  const modal = document.getElementById(modalId)
  const embedContainer = modal.querySelector(".google-embed")

  if (embedContainer && documentId) {
    embedContainer.innerHTML = `
            <iframe 
                src="https://docs.google.com/document/d/${documentId}/pub?embedded=true" 
                width="100%" 
                height="400" 
                frameborder="0">
            </iframe>
        `
  }
}

// Función para actualizar el banner de alertas
function updateAlertBanner(message, type = "warning") {
  const banner = document.getElementById("alertBanner")
  const messageSpan = banner.querySelector("span")

  messageSpan.textContent = message
  banner.className = `alert-banner ${type}`
  banner.style.display = "block"
}

// Agregar estilos CSS para animaciones adicionales
const additionalStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
    }
`

// Agregar estilos adicionales al head
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)
