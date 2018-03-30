function attachEvents() {
    //bind menu buttons
    $('#linkHome').on('click', showHomeView);
    $('#linkLogin').on('click', showFormView);
    $('#linkRegister').on('click', showFormView);
    $('#linkLogout').on('click', webApi.logOutUser);
    $('#linkCreateAd').on('click', showCreateAdView);
    $('#linkListAds').on('click', listAds);

    //bind forms
    $('#buttonRegisterUser').on('click', webApi.registerUser);
    $('#buttonLoginUser').on('click', webApi.loginUser);
    $('#buttonCreateAd').on('click', createAd);
    $('#buttonEditAd').on('click', editBook);


    // $("#infoBox, #errorBox").on('click', function() {
    //     $(this).fadeOut()
    // })

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').hide()
    });
}