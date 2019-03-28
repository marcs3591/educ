$(function () {
    $(".scroll").on('click', function () {
        $(".scroll").css("display", "none");
        $(".side").slideToggle();
    });
    $(".close_me").on('click', function () {
        $(".scroll").css("display", "flex");
        $(".side").slideToggle();
    });
    $('._hamburger').on('click', function () {
        $('.hide').slideToggle();
    });
    $('.wrap ._hamburger').on('click', function () {
        $(".wrap .hero-nav").toggleClass("active");
    });
    $("#cls").on('click', function () {
        $('#pop_up').css("display", 'none');
    });
    $('#feedback_form').on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        let cv = $('#cv').prop('files');
        if (typeof cv !== 'undefined')
            formData.append('cv', cv[0]);
        $.ajax({
            url: '/feedback',
            type: 'POST',
            dataType: 'json',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.status){
                    $('#feedback_form').replaceWith(data.content);
                }
            }
        })
    });
    $('body').on('click', '.offer-paginator a', function (e) {
        e.preventDefault();
        let params = $(this).data('params');
        let page = $(this).data('page');
        getOffers(params.id_category, page);
    });
    $('body').on('focus', '#phone', function () {
        let phone_input = $("#phone");
        let masked = phone_input.data('masked');
        if (typeof masked === 'undefined') {
            phone_input.data('masked', true);
            phone_input.mask('+' + phone_code + '8(999)999-99-99');
        }
    });
    //category footer
    $('.foot_category').on('click', function () {
        let id_category = $(this).data('id_category');
        if (typeof is_main !== 'undefined')
            getOffers(id_category);
        //else
    });
});

function getOffers(id_category, page = 1) {
    $.ajax({
        type: 'POST',
        url: 'offers/filter',
        dataType: 'json',
        data: {id_category: id_category, page: page},
        success: function (data) {
            if (data.status) {
                $('#offers-content').replaceWith(data.content);
                $('html,body').animate({scrollTop: $('#offers-content').offset().top} - 150, 500);
            }
        }
    });
}

function showAlert(text, status = 'success') {
    let html = '<div id="alert" class="alert alert-' + status + '"><button type="button" class="close" data-dismiss="alert">&times;</button>'
        + text + '</div>';
    $('#alert').replaceWith(html);
    $('#alert').fadeIn();
    let width = $('#alert').outerWidth();
    setTimeout(function () {
        $('#alert').animate({
            'right': -width
        }, 700);
    }, 2500);
}
