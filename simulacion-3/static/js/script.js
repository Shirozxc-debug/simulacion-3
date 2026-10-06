document.addEventListener('DOMContentLoaded', () => {

    // 1. Incrementar / decrementar contador de "Me gusta"
    const btnLike = document.querySelector('#btn-like');
    const contadorLikes = document.querySelector('#contador-likes');
    let likesCount = 4800; // Representa 4,8 K
    let dioLike = false;

    if (btnLike && contadorLikes) {
        btnLike.addEventListener('click', () => {
            if (!dioLike) {
                likesCount++;
                contadorLikes.textContent = (likesCount / 1000).toFixed(1).replace('.', ',') + ' K';
                dioLike = true;
            } else {
                likesCount--;
                contadorLikes.textContent = (likesCount / 1000).toFixed(1).replace('.', ',') + ' K';
                dioLike = false;
            }
        });
    }

    // 2. Botón "Suscribirse" (Suma suscriptor, cambia texto y color)
    const btnSuscribirse = document.querySelector('#btn-suscribirse');
    const contadorSuscriptores = document.querySelector('#contador-suscriptores');
    let suscrito = false;

    if (btnSuscribirse && contadorSuscriptores) {
        btnSuscribirse.addEventListener('click', () => {
            if (!suscrito) {
                btnSuscribirse.textContent = 'Suscrito';
                btnSuscribirse.classList.add('suscrito');
                contadorSuscriptores.textContent = '1.200.001 suscriptores';
                suscrito = true;
            } else {
                btnSuscribirse.textContent = 'Suscribirse';
                btnSuscribirse.classList.remove('suscrito');
                contadorSuscriptores.textContent = '1,2 M de suscriptores';
                suscrito = false;
            }
        });
    }

    // 3. Añadir a la cola de reproducción
    const btnsAnadirCola = document.querySelectorAll('.btn-add-cola');
    const contenedorCola = document.querySelector('#lista-cola');

    btnsAnadirCola.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tarjeta = e.target.closest('.tarjeta-video-lateral');
            
            if (tarjeta && contenedorCola) {
                // Clonar tarjeta para añadirla a la cola
                const clon = tarjeta.cloneNode(true);
                
                // Cambiar el icono de (+) por la (X) de eliminar usando querySelector
                const icono = clon.querySelector('img');
                if (icono) {
                    icono.src = 'static/images/X-icon-removebg-preview.png';
                    icono.classList.remove('btn-add-cola');
                    icono.classList.add('btn-remove-cola');
                    
                    // Evento para eliminar elemento de la cola al hacer click en la X
                    icono.addEventListener('click', () => clon.remove());
                }

                // Activar comportamiento hover en el video clonado
                const videoClon = clon.querySelector('video');
                if (videoClon) configurarHoverVideo(videoClon);

                contenedorCola.appendChild(clon);
            }
        });
    });

    // Botón Limpiar cola
    const btnLimpiarCola = document.querySelector('#btn-limpiar-cola');
    if (btnLimpiarCola && contenedorCola) {
        btnLimpiarCola.addEventListener('click', () => {
            contenedorCola.innerHTML = '';
        });
    }

    // 4. Reproducción automática al pasar el mouse (Hover) sin sonido y pausa al salir
    const videosConHover = document.querySelectorAll('.seccion-derecho video, .mas-video video');

    function configurarHoverVideo(video) {
        video.muted = true; // Silenciado para permitir auto-play sin bloqueo del navegador
        
        video.addEventListener('mouseenter', () => {
            video.play().catch(() => {}); // Reproduce al pasar el cursor
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Detiene y reinicia al salir
        });
    }

    videosConHover.forEach(video => configurarHoverVideo(video));
});