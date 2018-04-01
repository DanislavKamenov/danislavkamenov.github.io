function showMenuLinks() {
    $('#viewHome').show();
    $('#linkHome').show();
    if (sessionStorage.getItem("authToken") === null) {
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
        $('#linkLogout').hide();
        $('#loggedInUser').hide();
    } else { //user is logged in.
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();
        $('#loggedInUser').show().text(`Welcome, ${sessionStorage.getItem('username')}!`);
    }
}

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.show().text(message);
    setTimeout(() => infoBox.fadeOut(), 3000);
}

function showError(message) {
    let errorBox = $('#errorBox');
    errorBox.show().text(message);
}

function showView(selector) {
    $('main').find('> section').hide();
    $(selector).show();
}

function showHomeView() {
    showView('#viewHome');
}

function showFormView(e) {
    let formName = $(e.target).attr('id').slice(4);
    $('#form'+ formName).trigger('reset');
    showView('#view' + formName);
}

function showAdDetails(ad) {
    let adInfo = $('<div>').append(
        $('<img src="" height="200" width="300">').attr('src', ad.image),
        $('<br>'),
        $('<label>').text('Title: '),
        $('<h1>').text(ad.title),
        $('<label>').text('Description: '),
        $('<p>').text(ad.description),
        $('<label>').text('Publisher: '),
        $('<div>').text(ad.publisher),
        $('<label>').text('Date: '),
        $('<div>').text(ad.datePublished),
        $('<label>').text('Views: '),
        $('<div>').text(ad.viewCount));

    $('#viewDetailsAd').empty().append(adInfo);
    showView('#viewDetailsAd');
}

function showAdToEdit(e) {
    let ad = e.data.ad;
    let parent = $('#formEditAd');
    parent.find('input[name="id"]').val(ad._id);
    parent.find('input[name="publisher"]').val(ad.publisher);
    parent.find('input[name="title"]').val(ad.title);
    parent.find('textarea[name="description"]').val(ad.description);
    parent.find('input[name="datePublished"]').val(ad.datePublished);
    parent.find('input[name="price"]').val(ad.price);
    parent.find('input[name="image"]').val(ad.image);
    showView('#viewEditAd');
}