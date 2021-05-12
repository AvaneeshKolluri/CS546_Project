(function($) {
	
    let quizform = $('#quiz-form');
    let errorDiv = $('#errorDiv');
    let formDiv = $('#formDiv');
    let results = $('#results');
    formDiv.show();
    results.empty();
    results.hide();

    quizform.submit(function(event) {
        event.preventDefault();
        errorDiv.empty();
        results.empty();

        if (!$("input[name='q1']:checked").val()) {
            errorDiv.append($('<p>Please answer all questions before submitting</p>'));
            return false;
        }
        if (!$("input[name='q2']:checked").val()) {
            errorDiv.append($('<p>Please answer all questions before submitting</p>'));
            return false;
        }
        if (!$("input[name='q3']:checked").val()) {
            errorDiv.append($('<p>Please answer all questions before submitting</p>'));
            return false;
        }

        const q1 = $('#q1A').is(':checked');
        const q2 = $('#q2A').is(':checked');
        const q3 = $('#q3A').is(':checked');
        if (q1 && q2 && q3){
            results.append('<p>You may be at high risk for COVID. Please get tested.</p>');
        } else if ((q1 || q3) && q2) {
            results.append('<p>You may be at risk for COVID. It is heavily suggested that you get tested.</p>');
        } else if (q1 || q3) {
            results.append('<p>You may be at risk for COVID. It is suggested that you get tested.</p>');
        } else {
            results.append('<p>You are not at risk of COVID.</p>')
        }
        let restart = $('<button></button>').text('Take Quiz Again');
        restart.addClass("btn btn-secondary");
        restart.click(function() {
            errorDiv.empty();
            results.hide();
            $("input[name='q1']").attr('checked', false);
            $("input[name='q2']").attr('checked', false);
            $("input[name='q3']").attr('checked', false);
            formDiv.show();
            resultsDiv.empty();
        });
        results.append(restart);
        results.append('<a  href="/"><button class="btn btn-secondary">Home Page</button></a>');
        formDiv.hide();
        results.show();
    });
})(window.jQuery);