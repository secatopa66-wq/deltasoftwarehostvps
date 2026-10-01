$(document).ready(function() {

    const planMessages = {
        free: 'Has seleccionado la prueba gratuita por 7 dias. Disfruta de todas las funcionalidades.',
        monthly: 'Plan mensual activado. Se realizara el cargo de $49 cada mes.',
        yearly: 'Plan anual contratado. $399 por 12 meses (ahorro del 32%).'
    };

    const digitalizadorMessages = {
        'basico-free': 'Descarga gratuita del Digitalizador Basico activada por 5 dias.',
        'basico-monthly': 'Suscripcion mensual del Digitalizador Basico confirmada. S/800/mes.',
        'basico-yearly': 'Plan anual del Digitalizador Basico activado. S/9,600/año (ahorro 33%).',
        'avanzado-free': 'Descarga gratuita del Digitalizador Avanzado activada por 7 dias.',
        'avanzado-monthly': 'Suscripcion mensual del Digitalizador Avanzado confirmada. S/1,800/mes.',
        'avanzado-yearly': 'Plan anual del Digitalizador Avanzado activado. S/21,600/año (ahorro 32%).'
    };

    const vpsMessages = {
        'vps-a-monthly': {
            mensaje: 'Suscripcion mensual VPS confirmada.',
            producto: 'VPS - Gestion Avanzada (16GB RAM / 6 vCPU)',
            periodo: 'Mensual',
            precioConIGV: 890.69
        },
        'vps-a-yearly': {
            mensaje: 'Plan anual VPS activado. Ahorro del 23%.',
            producto: 'VPS - Gestion Avanzada (16GB RAM / 6 vCPU)',
            periodo: 'Anual',
            precioConIGV: 8230.00
        },
        'vps-b-monthly': {
            mensaje: 'Suscripcion mensual VPS confirmada.',
            producto: 'VPS - Gestion Estandar (8GB RAM / 4 vCPU)',
            periodo: 'Mensual',
            precioConIGV: 752.16
        },
        'vps-b-yearly': {
            mensaje: 'Plan anual VPS activado. Ahorro del 23%.',
            producto: 'VPS - Gestion Estandar (8GB RAM / 4 vCPU)',
            periodo: 'Anual',
            precioConIGV: 6950.00
        },
        'vps-c-monthly': {
            mensaje: 'Suscripcion mensual VPS confirmada.',
            producto: 'VPS - Gestion Esencial (4GB RAM / 2 vCPU)',
            periodo: 'Mensual',
            precioConIGV: 414.50
        },
        'vps-c-yearly': {
            mensaje: 'Plan anual VPS activado. Ahorro del 23%.',
            producto: 'VPS - Gestion Esencial (4GB RAM / 2 vCPU)',
            periodo: 'Anual',
            precioConIGV: 3830.00
        }
    };

    const landingMessages = {
        'landing-basica-1mes': 'Landing Basica contratada por 1 mes. S/1,100.',
        'landing-basica-6meses': 'Landing Basica contratada por 6 meses. S/5,500 (ahorro 17%).',
        'landing-basica-1year': 'Landing Basica contratada por 1 año. S/9,000 (ahorro 32%).',
        'landing-profesional-1mes': 'Landing Profesional contratada por 1 mes. S/2,200.',
        'landing-profesional-6meses': 'Landing Profesional contratada por 6 meses. S/11,000 (ahorro 17%).',
        'landing-profesional-1year': 'Landing Profesional contratada por 1 año. S/18,000 (ahorro 32%).'
    };

    const hostingMessages = {
        'hosting-basico-monthly': 'Hosting Basico contratado por 1 mes. S/55/mes.',
        'hosting-basico-yearly': 'Hosting Basico contratado por 12 meses. S/550/año.',
        'hosting-premium-monthly': 'Hosting Premium contratado por 1 mes. S/90/mes.',
        'hosting-premium-yearly': 'Hosting Premium contratado por 12 meses. S/900/año.'
    };

    let currentCurrency = 'usd';
    let currentModalData = null;

    function showSection(sectionId) {
        $('#vpsSection, #digitalizadorSection, #apisSection, #landingSection, #hostingSection, #analiticaSection, #configuracionSection').hide();
        $('#' + sectionId).show();

        const titles = {
            'vpsSection': 'VPS - Servidores',
            'digitalizadorSection': 'Digitalizador',
            'apisSection': 'API - Planes de Subscripcion',
            'landingSection': 'Landing Pages',
            'hostingSection': 'Hosting Web',
            'analiticaSection': 'Analitica',
            'configuracionSection': 'Configuracion'
        };
        $('#pageTitle').text(titles[sectionId] || 'Delta Software');

        $('.sidebar-nav a').removeClass('active');
        const navMap = {
            'vpsSection': '#navVps',
            'digitalizadorSection': '#navDigitalizador',
            'apisSection': '#navApis',
            'landingSection': '#navLanding',
            'hostingSection': '#navHosting',
            'analiticaSection': '#navAnalitica',
            'configuracionSection': '#navConfiguracion'
        };
        $(navMap[sectionId]).addClass('active');

        if (sectionId === 'digitalizadorSection') {
            $('#planesBasico, #planesAvanzado').hide();
            $('.digitalizador-type-selector').show();
        }

        if (sectionId === 'vpsSection') {
            $('#planesVpsA, #planesVpsB, #planesVpsC').hide();
            $('.vps-type-selector').show();
        }

        if (sectionId === 'landingSection') {
            $('#planesLandingBasica, #planesLandingProfesional').hide();
            $('.landing-type-selector').show();
        }

        if (sectionId === 'hostingSection') {
            $('#planesHostingBasico, #planesHostingPremium').hide();
            $('.hosting-type-selector').show();
        }
    }

    $('#navVps').on('click', function(e) {
        e.preventDefault();
        showSection('vpsSection');
    });

    $('#navDigitalizador').on('click', function(e) {
        e.preventDefault();
        showSection('digitalizadorSection');
    });

    $('#navApis').on('click', function(e) {
        e.preventDefault();
        showSection('apisSection');
    });

    $('#navLanding').on('click', function(e) {
        e.preventDefault();
        showSection('landingSection');
    });

    $('#navHosting').on('click', function(e) {
        e.preventDefault();
        showSection('hostingSection');
    });

    $('#navAnalitica').on('click', function(e) {
        e.preventDefault();
        showSection('analiticaSection');
    });

    $('#navConfiguracion').on('click', function(e) {
        e.preventDefault();
        showSection('configuracionSection');
    });

    function updatePrices(currency) {
        $('.plan-price').each(function() {
            const usdPrice = $(this).data('usd');
            const penPrice = $(this).data('pen');
            const periodText = $(this).find('.period-text').text();

            if (currency === 'usd') {
                if (usdPrice) {
                    $(this).html(usdPrice + ' <small class="period-text">' + periodText + '</small>');
                }
            } else {
                if (penPrice) {
                    $(this).html(penPrice + ' <small class="period-text">' + periodText + '</small>');
                }
            }
        });
    }

    $('.currency-btn').on('click', function() {
        $('.currency-btn').removeClass('active');
        $(this).addClass('active');
        currentCurrency = $(this).data('currency');
        updatePrices(currentCurrency);
    });

    function openModal(data) {
        currentModalData = data;
        const subtotalCalc = data.precioConIGV / 1.18;
        const igvCalc = data.precioConIGV - subtotalCalc;

        $('#modalSubtitle').text(data.mensaje);
        $('#modalProducto').text(data.producto);
        $('#modalPeriodo').text(data.periodo);
        $('#modalPrecioIGV').text('S/ ' + data.precioConIGV.toFixed(2));
        $('#modalSubtotal').text('S/ ' + subtotalCalc.toFixed(2));
        $('#modalIGV').text('S/ ' + igvCalc.toFixed(2));
        $('#modalTotal').text('S/ ' + data.precioConIGV.toFixed(2));
        $('#modalOverlay').addClass('active');
        $('body').css('overflow', 'hidden');
    }

    function closeModal() {
        $('#modalOverlay').removeClass('active');
        $('body').css('overflow', '');
        currentModalData = null;
    }

    $('#modalClose, #modalCancel').on('click', function() {
        closeModal();
    });

    $('#modalOverlay').on('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#modalOverlay').hasClass('active')) {
            closeModal();
        }
    });

    $('#modalConfirm').on('click', function() {
        if (!currentModalData) return;

        const btn = $(this);
        btn.html('<i class="fas fa-spinner fa-pulse"></i> Procesando...');
        btn.prop('disabled', true);

        setTimeout(function() {
            btn.html('<i class="fas fa-check"></i> Confirmar Compra');
            btn.prop('disabled', false);
            closeModal();
            alert('Compra confirmada.\n\nProducto: ' + currentModalData.producto + '\nPeriodo: ' + currentModalData.periodo + '\nTotal pagado: S/ ' + currentModalData.precioConIGV.toFixed(2));
        }, 1200);
    });

    $('.btn-subscribe[data-plan]').on('click', function(e) {
        e.preventDefault();
        const plan = $(this).data('plan');

        let message = planMessages[plan] || 'Suscripcion procesada.';

        if (plan === 'free') {
            message = 'Prueba gratuita activada por 7 dias. Disfruta de las APIs.';
        } else if (plan === 'monthly') {
            message = 'Suscripcion mensual confirmada. Acceso total durante 30 dias.';
        } else if (plan === 'yearly') {
            message = 'Plan anual activado. Ahorro garantizado y soporte prioritario.';
        }

        const currencySymbol = currentCurrency === 'usd' ? '$' : 'S/';
        const finalMsg = message + '\n\n' + currencySymbol + ' Integracion y despliegue en produccion disponibles para todos los planes.';

        alert(finalMsg);

        $(this).find('i').addClass('fa-spinner fa-pulse');
        setTimeout(function() {
            $(this).find('i').removeClass('fa-spinner fa-pulse');
        }.bind(this), 700);
    });

    $('.btn-subscribe[data-digitalizador-plan]').on('click', function(e) {
        e.preventDefault();
        const plan = $(this).data('digitalizador-plan');

        let message = digitalizadorMessages[plan] || 'Suscripcion procesada.';

        const currencySymbol = currentCurrency === 'usd' ? '$' : 'S/';
        const tipo = plan.includes('basico') ? 'Digitalizador Basico' : 'Digitalizador Avanzado';
        const finalMsg = message + '\n\n' + currencySymbol + ' Descarga el software desde la seccion de descargas.\nTipo: ' + tipo;

        alert(finalMsg);

        $(this).find('i').addClass('fa-spinner fa-pulse');
        setTimeout(function() {
            $(this).find('i').removeClass('fa-spinner fa-pulse');
        }.bind(this), 700);
    });

    $('.btn-subscribe[data-vps-plan]').on('click', function(e) {
        e.preventDefault();
        const plan = $(this).data('vps-plan');
        const data = vpsMessages[plan];

        if (!data) {
            alert('Suscripcion procesada.');
            return;
        }

        openModal(data);
    });

    $('.btn-subscribe[data-landing-plan]').on('click', function(e) {
        e.preventDefault();
        const plan = $(this).data('landing-plan');

        let message = landingMessages[plan] || 'Suscripcion procesada.';

        const tipo = plan.includes('basica') ? 'Landing Basica' : 'Landing Profesional';
        let periodo = '1 Mes';
        if (plan.includes('6meses')) periodo = '6 Meses';
        if (plan.includes('1year')) periodo = '1 Año';

        const finalMsg = message + '\n\nTipo: ' + tipo + '\nPeriodo: ' + periodo;

        alert(finalMsg);

        $(this).find('i').addClass('fa-spinner fa-pulse');
        setTimeout(function() {
            $(this).find('i').removeClass('fa-spinner fa-pulse');
        }.bind(this), 700);
    });

    $('.btn-subscribe[data-hosting-plan]').on('click', function(e) {
        e.preventDefault();
        const plan = $(this).data('hosting-plan');

        let message = hostingMessages[plan] || 'Suscripcion procesada.';

        const tipo = plan.includes('basico') ? 'Hosting Basico' : 'Hosting Premium';
        const periodo = plan.includes('monthly') ? 'Mensual' : 'Anual';
        const finalMsg = message + '\n\nTipo: ' + tipo + '\nPeriodo: ' + periodo;

        alert(finalMsg);

        $(this).find('i').addClass('fa-spinner fa-pulse');
        setTimeout(function() {
            $(this).find('i').removeClass('fa-spinner fa-pulse');
        }.bind(this), 700);
    });

    $('.plan-card').on('mouseenter', function() {
        $(this).addClass('card-hovered');
    });

    $('.plan-card').on('mouseleave', function() {
        $(this).removeClass('card-hovered');
    });

    $('.plan-card').on('click', function() {
        if ($(this).hasClass('featured-six')) return;
        $(this).css('animation', 'none');
        void this.offsetWidth;
        $(this).css('animation', 'cardBounce 0.6s ease');
    });

    let sidebarOpen = false;

    $('#menuToggle').on('click', function() {
        sidebarOpen = !sidebarOpen;
        $('#sidebar').toggleClass('expanded', sidebarOpen);
    });

    $('#themeToggle').on('click', function() {
        $('body').toggleClass('light-mode');
        const icon = $(this).find('i');
        if ($('body').hasClass('light-mode')) {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
        localStorage.setItem('theme', $('body').hasClass('light-mode') ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        $('body').addClass('light-mode');
        $('#themeToggle i').removeClass('fa-moon').addClass('fa-sun');
    }

    $(document).on('click', function(e) {
        if (window.innerWidth <= 850) {
            const sidebar = $('#sidebar');
            const toggle = $('#menuToggle');
            if (!sidebar.is(e.target) && !sidebar.has(e.target).length && !toggle.is(e.target) && !toggle.has(e.target).length) {
                sidebar.removeClass('expanded');
                sidebarOpen = false;
            }
        }
    });

    $('.btn-download').on('click', function() {
        const os = $(this).text().trim();
        alert('Descargando Digitalizador para ' + os + '...\nVersion 3.2.1\nEl archivo comenzara a descargarse en breve.');
    });

    $('#typeBasico .btn-select-type').on('click', function() {
        $('.digitalizador-type-selector').hide();
        $('#planesBasico').show();
        $('#planesAvanzado').hide();
        $('html, body').animate({ scrollTop: $('#planesBasico').offset().top - 100 }, 500);
    });

    $('#typeAvanzado .btn-select-type').on('click', function() {
        $('.digitalizador-type-selector').hide();
        $('#planesAvanzado').show();
        $('#planesBasico').hide();
        $('html, body').animate({ scrollTop: $('#planesAvanzado').offset().top - 100 }, 500);
    });

    $('#backFromBasico').on('click', function() {
        $('#planesBasico').hide();
        $('.digitalizador-type-selector').show();
        $('html, body').animate({ scrollTop: $('.digitalizador-type-selector').offset().top - 100 }, 500);
    });

    $('#backFromAvanzado').on('click', function() {
        $('#planesAvanzado').hide();
        $('.digitalizador-type-selector').show();
        $('html, body').animate({ scrollTop: $('.digitalizador-type-selector').offset().top - 100 }, 500);
    });

    $('#typeVpsA .btn-select-type').on('click', function() {
        $('.vps-type-selector').hide();
        $('#planesVpsA').show();
        $('#planesVpsB, #planesVpsC').hide();
        $('html, body').animate({ scrollTop: $('#planesVpsA').offset().top - 100 }, 500);
    });

    $('#typeVpsB .btn-select-type').on('click', function() {
        $('.vps-type-selector').hide();
        $('#planesVpsB').show();
        $('#planesVpsA, #planesVpsC').hide();
        $('html, body').animate({ scrollTop: $('#planesVpsB').offset().top - 100 }, 500);
    });

    $('#typeVpsC .btn-select-type').on('click', function() {
        $('.vps-type-selector').hide();
        $('#planesVpsC').show();
        $('#planesVpsA, #planesVpsB').hide();
        $('html, body').animate({ scrollTop: $('#planesVpsC').offset().top - 100 }, 500);
    });

    $('#backFromVpsA').on('click', function() {
        $('#planesVpsA').hide();
        $('.vps-type-selector').show();
        $('html, body').animate({ scrollTop: $('.vps-type-selector').offset().top - 100 }, 500);
    });

    $('#backFromVpsB').on('click', function() {
        $('#planesVpsB').hide();
        $('.vps-type-selector').show();
        $('html, body').animate({ scrollTop: $('.vps-type-selector').offset().top - 100 }, 500);
    });

    $('#backFromVpsC').on('click', function() {
        $('#planesVpsC').hide();
        $('.vps-type-selector').show();
        $('html, body').animate({ scrollTop: $('.vps-type-selector').offset().top - 100 }, 500);
    });

    $('#typeLandingBasica .btn-select-type').on('click', function() {
        $('.landing-type-selector').hide();
        $('#planesLandingBasica').show();
        $('#planesLandingProfesional').hide();
        $('html, body').animate({ scrollTop: $('#planesLandingBasica').offset().top - 100 }, 500);
    });

    $('#typeLandingProfesional .btn-select-type').on('click', function() {
        $('.landing-type-selector').hide();
        $('#planesLandingProfesional').show();
        $('#planesLandingBasica').hide();
        $('html, body').animate({ scrollTop: $('#planesLandingProfesional').offset().top - 100 }, 500);
    });

    $('#backFromLandingBasica').on('click', function() {
        $('#planesLandingBasica').hide();
        $('.landing-type-selector').show();
        $('html, body').animate({ scrollTop: $('.landing-type-selector').offset().top - 100 }, 500);
    });

    $('#backFromLandingProfesional').on('click', function() {
        $('#planesLandingProfesional').hide();
        $('.landing-type-selector').show();
        $('html, body').animate({ scrollTop: $('.landing-type-selector').offset().top - 100 }, 500);
    });

    $('#typeHostingBasico .btn-select-type').on('click', function() {
        $('.hosting-type-selector').hide();
        $('#planesHostingBasico').show();
        $('#planesHostingPremium').hide();
        $('html, body').animate({ scrollTop: $('#planesHostingBasico').offset().top - 100 }, 500);
    });

    $('#typeHostingPremium .btn-select-type').on('click', function() {
        $('.hosting-type-selector').hide();
        $('#planesHostingPremium').show();
        $('#planesHostingBasico').hide();
        $('html, body').animate({ scrollTop: $('#planesHostingPremium').offset().top - 100 }, 500);
    });

    $('#backFromHostingBasico').on('click', function() {
        $('#planesHostingBasico').hide();
        $('.hosting-type-selector').show();
        $('html, body').animate({ scrollTop: $('.hosting-type-selector').offset().top - 100 }, 500);
    });

    $('#backFromHostingPremium').on('click', function() {
        $('#planesHostingPremium').hide();
        $('.hosting-type-selector').show();
        $('html, body').animate({ scrollTop: $('.hosting-type-selector').offset().top - 100 }, 500);
    });

    showSection('vpsSection');

});