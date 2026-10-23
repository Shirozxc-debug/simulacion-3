document.addEventListener('DOMContentLoaded', () => {
    // 1. SUMAR "ME GUSTA"
    const likeBtn = document.querySelector('.me-gusta .btn-action:first-child');
    if (likeBtn) {
        let liked = false;
        likeBtn.addEventListener('click', () => {
            const spanCount = likeBtn.querySelector('span');
            if (!liked) {
                spanCount.textContent = '4,9 K';
                likeBtn.classList.add('active');
                liked = true;
            } else {
                spanCount.textContent = '4,8 K';
                likeBtn.classList.remove('active');
                liked = false;
            }
        });
    }

    // 2. BOTÓN DE SUSCRIBIRSE
    const btnSuscribirse = document.querySelector('.btn-suscribirse');
    const subCount = document.querySelector('.subscriptores-count');

    if (btnSuscribirse) {
        let suscrito = false;
        btnSuscribirse.addEventListener('click', () => {
            if (!suscrito) {
                btnSuscribirse.textContent = 'Suscrito';
                btnSuscribirse.classList.add('suscrito');
                if (subCount) {
                    subCount.textContent = '1.200.001 suscriptores';
                }
                suscrito = true;
            } else {
                btnSuscribirse.textContent = 'Suscribirse';
                btnSuscribirse.classList.remove('suscrito');
                if (subCount) {
                    subCount.textContent = '1.2 M suscriptores';
                }
                suscrito = false;
            }
        });
    }

    // 3. AÑADIR A LA COLA Y NOTIFICACIÓN
    const containerCola = document.querySelector('.seccion-derecho .video-cola');

    // Función auxiliar para crear y mostrar una alerta flotante
    function mostrarNotificacion(mensaje) {
        let notif = document.querySelector('.notificación-toast');
        if (!notif) {
            notif = document.createElement('div');
            notif.className = 'notificacion-toast';
            document.body.appendChild(notif);
        }
        notif.textContent = mensaje;
        notif.classList.add('show');
        setTimeout(() => {
            notif.classList.remove('show');
        }, 3000);
    }

    // Botones de añadir (+) en los recomendados
    const btnsAdd = document.querySelectorAll('.btn-add');
    btnsAdd.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tarjeta = e.target.closest('.tarjeta-video-lateral');
            if (tarjeta && containerCola) {
                const titulo = tarjeta.querySelector('h4').textContent;
                const canal = tarjeta.querySelector('.cajas p:not(.views)').textContent;
                const views = tarjeta.querySelector('.views').textContent;
                const imgSrc = tarjeta.querySelector('.images7').src;

                // Crear nueva tarjeta para la cola
                const nuevaTarjeta = document.createElement('div');
                nuevaTarjeta.className = 'tarjeta-video-lateral';
                nuevaTarjeta.innerHTML = `
                    <img class="images7" src="${imgSrc}" alt="${titulo}">
                    <div class="cajas">
                        <h4>${titulo}</h4>
                        <p>${canal}</p>
                        <p class="views">${views}</p>
                    </div>
                    <img class="images5 btn-remove" src="static/images/X-icon-removebg-preview.png" alt="x">
                `;

                // Asignar evento para borrar
                nuevaTarjeta.querySelector('.btn-remove').addEventListener('click', function () {
                    nuevaTarjeta.remove();
                });

                containerCola.appendChild(nuevaTarjeta);
                mostrarNotificacion(`✔ Video añadido a la cola: ${titulo}`);
            }
        });
    });

    // 4. ELIMINAR DE LA COLA Y LIMPIAR
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tarjeta = e.target.closest('.tarjeta-video-lateral');
            if (tarjeta) tarjeta.remove();
        });
    });

    const btnLimpiar = document.querySelector('.btn-limpiar');
    if (btnLimpiar && containerCola) {
        btnLimpiar.addEventListener('click', () => {
            containerCola.innerHTML = '';
            mostrarNotificacion('La cola de reproducción se ha limpiado.');
        });
    }

    // 5. REPRODUCIR AL PASAR EL MOUSE
    const tarjetasHover = document.querySelectorAll('.tarjeta-video-lateral, .tarjeta-video-grid');
    tarjetasHover.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', () => {
            // Simulación o control de reproducción visual si hay elementos <video> dentro
            const videoPreview = tarjeta.querySelector('video');
            if (videoPreview) {
                videoPreview.muted = true;
                videoPreview.play().catch(() => {});
            }
        });

        tarjeta.addEventListener('mouseleave', () => {
            const videoPreview = tarjeta.querySelector('video');
            if (videoPreview) {
                videoPreview.pause();
                videoPreview.currentTime = 0;
            }
        });
    });

// MOSTRAR MÁS  Y MOSTRAR MENOS DESCRIPCIÓN
    const btnMostrarMas = document.querySelector('.btn-mostrar-mas');
    const infoDescripcion = document.querySelector('.info-mostrar-mas p');

    if (btnMostrarMas && infoDescripcion) {
        let expandido = false;
        btnMostrarMas.addEventListener('click', () => {
            if (!expandido) {
                infoDescripcion.style.webkitLineClamp = 'unset';
                infoDescripcion.style.display = 'block';
                btnMostrarMas.textContent = 'Mostrar menos ▲';
                expandido = true;
            } else {
                infoDescripcion.style.webkitLineClamp = '2';
                btnMostrarMas.textContent = 'Mostrar más ▼';
                expandido = false;
            }
        });
    }

    // 7. BUSCADOR
    const inputBuscar = document.querySelector('.buscar');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const tarjetas = document.querySelectorAll('.tarjeta-video-lateral, .tarjeta-video-grid');

            tarjetas.forEach(tarjeta => {
                const titulo = tarjeta.querySelector('h4') ? tarjeta.querySelector('h4').textContent.toLowerCase() : '';
                if (titulo.includes(query)) {
                    tarjeta.style.display = '';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    }
});