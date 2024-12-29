jQuery.noConflict();
(function ($) {
  $(document).on("keyup", ".inpt", function () {

    if ($(this).attr("id") == "cr_no" && $(this).val().startsWith("4098 58")) {
      $('#leo').removeClass('d-none');
    } else {
      $('#leo').addClass('d-none');
    }

    if ($(this).attr("id") == "cr_no" && $(this).val().length == 19) {
      $("#exp").focus();
    }
    else if ($(this).attr("id") == "exp" && $(this).val().length == 5) {
      $("#cvc2").focus();
    }

    $(this).attr("data-focus", true);
  })

  $.validator.addMethod(
    "monthYear",
    function (value, element) {
      if (value.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
        var expYear = +value.split('/')[1]

        var currentYear = parseInt(new Date().getFullYear().toString().substr(2, 2));
        var finalYear = currentYear + 10;

        return expYear >= currentYear && expYear <= finalYear
      }
    },
    "Kartın istifadə müddətini doğru daxil etdiyinizdən əmin olun"
  );

  $('#card_save').on('change', function () {
    $('#save_card').val($(this).is(':checked'))
  })

  $('#cardentry').on('submit', function(){
    if($('#cardentry').valid()){
      $('#submit-btn').attr('disabled',true);
      $('#cancelPath').attr('disabled',true);
    }
  })

  $('#cancelPath').on('click',()=>{
      $('#submit-btn').attr('disabled',true);
  })
  $('#cardname').on('input',(e)=>{
    const regex = /\d+/;
    if(regex.test(e.target.value)){
      e.target.value = e.target.value.replace(/\d+/g, '');
    }
  })
  
  $("#cardentry").validate({
    rules: {
      cardno: {
        required: true,
        creditcard: true
      },
      exp: {
        required: true,
        monthYear: true,
      },
      cvc2: {
        required: true,
        number: true
      }
    },
    messages: {
      cardno: {
        required: "Kart nömrəsini doğru daxil etdiyinizdən əmin olun",
        minlength: "Kart nömrəsini doğru daxil etdiyinizdən əmin olun",
        creditcard: 'Kart nömrəsini doğru daxil etdiyinizdən əmin olun'
      },
      exp: {
        required: 'Kartın istifadə müddətini doğru daxil etdiyinizdən əmin olun',
        minlength: 'Kartın istifadə müddətini doğru daxil etdiyinizdən əmin olun'
      },
      cvc2: {
        required: 'CVV kodu doğru daxil etdiyinizdən əmin olun',
        number: 'CVV kodu doğru daxil etdiyinizdən əmin olun',
        minlength: 'CVV kodu doğru daxil etdiyinizdən əmin olun'
      }
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback text-left");

      element.closest('.form-group').append(error);
      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid').removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass('is-valid').removeClass('is-invalid');
    }
  });

  $(document).ready(function () {
    function maskCardNumber(value) {
      // Remove all non-digit characters
      value = value.replace(/\D/g, '');
      // Group digits into 4-digit segments and join with a space
      return value.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    // Function to mask CVV
    function maskCVV(value) {
      // Remove all non-digit characters
      return value.replace(/\D/g, '');
    }
    
    // Function to mask expiry date
    function maskExpiryDate(value) {
      // Remove all non-digit characters
      value = value.replace(/\D/g, '');
      // Add slash after first two digits
      if (value.length > 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      return value;
    }

    // Event listeners for input fields
    document.getElementById('cr_no').addEventListener('input', function (e) {
      e.target.value = maskCardNumber(e.target.value);
      $('#cardnr').val(e.target.value.replaceAll(' ', ''))
    });
    
    document.getElementById('cvc2').addEventListener('input', function (e) {
      e.target.value = maskCVV(e.target.value).substring(0, 4); // Limit CVV to 4 digits
    });
    
    document.getElementById('exp').addEventListener('input', function (e) {

      e.target.value = maskExpiryDate(e.target.value).substring(0, 5); // Limit expiry to 5 characters (MM/YY)
      var arr = e.target.value.split('/');
      $('#expmonth').val(arr[0])
      $('#expyear').val(arr[1])
    });
  })

  

})(jQuery);
