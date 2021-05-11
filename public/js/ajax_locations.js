(function($) {


    let form_submit = $('#location-form');
    let street = $('#street-address');
    let date = $('#date');
    let user_locations = $('#user_locations');
    let error_div = $('#location-errors');
    error_div.empty();

    let covidform = $('#covid_status_form');
    let status_result = $('#covid_report_result');

    let date_report = $('#report_date');
    status_result.hide();




    covidform.submit(function(event) {
        event.preventDefault();
        status_result.empty();

        let covid_report_val = $("input[name='covid_report']:checked").val();
        console.log(covid_report_val);

        try {

            if (covid_report_val == undefined) {
                throw "No Option Was Selected."
            }

            let date_report_val = date_report.val();
            console.log(date_report_val);
            if (covid_report_val == 'Yes') {


                if (date_report_val.trim().length === 0) {
                    throw "Must Enter A Valid Date."
                }
                if (new Date(date_report_val) > new Date()) {
                    throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
                }
                let diff = Math.abs(new Date().getTime() - new Date(date_report_val).getTime()) / (1000 * 60 * 60 * 24);

                if (diff > 14) {
                    throw "Date Is More Than Two Weeks Old. Please Enter A Valid Date.";
                }


            } else {


                if (date_report_val.trim().length != 0) {
                    throw "Only Submit A Date If You Test Positive For Covid.";
                }

                date_report_val = null;
            }

            var requestConfig = {
                method: "POST",
                url: "/userinfo/covidstatus",
                contentType: "application/json",
                data: JSON.stringify({
                    covid_report: covid_report_val,
                    date_report: date_report_val
                })
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                status_result.append(responseMessage);
                console.log(responseMessage);

            });


            status_result.show();

        } catch (e) {
            //alert(e);
            status_result.append($('<p></p>').text(e));
            status_result.addClass("error-userinfo");
            status_result.show();
        }



    });

    form_submit.submit(function(event) {
        event.preventDefault();
        error_div.empty();

        try {

            let street_val = street.val();

            let date_val = date.val();

            //validate all fields

            if (street_val.trim().length === 0) {
                throw "Must Enter A Valid Street Address."
            }

            if (date_val.trim().length === 0) {
                throw "Must Enter A Valid Date."
            }
            if (new Date(date_val) > new Date()) {
                throw "Date Has Not Yet Occured. Please Enter A Valid Date.";
            }

            let diff = Math.abs(new Date().getTime() - new Date(date_val).getTime()) / (1000 * 60 * 60 * 24);

            if (diff > 14) {
                throw "Date Is More Than Two Weeks Old. Please Enter A Valid Date.";
            }

            var requestConfig = {
                method: "POST",
                url: "/userinfo",
                contentType: "application/json",
                data: JSON.stringify({
                    street: street_val,
                    date: date_val
                })
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                error_div.empty();

                if (responseMessage.includes("Invalid Hoboken Location")) {
                    error_div.append($('<p></p>').text("Invalid Hoboken Location. Please Try Again."));
                    error_div.addClass("error-userinfo");
                    error_div.show();
                } else {
                    console.log(responseMessage);
                    user_locations.append(responseMessage);
                }

            });



        } catch (e) {
            error_div.append($('<p></p>').text(e));
            error_div.addClass("error-userinfo");
            error_div.show();
        }




    });


})(window.jQuery);