$(document).ready(function(){
    var massDoctors={};
   $.getJSON('doctors.json', function(data) {
       massDoctors=data;
       console.log(massDoctors);
       $('#doctors').on('change', function(){
       for (var key in massDoctors) {
           var doctorInputVal=$('#doctors').val();
           console.log(doctorInputVal);
           if(key==doctorInputVal) {
               var doctor=document.createElement('h4');
               doctor.innerHTML=key;
               $('#time-dashboard').append(doctor);
               $('#time-dashboard').append('<p>Часы приема</p>');
               var n=massDoctors[key].out-massDoctors[key].in;
               console.log(n);
                for ( var i=0; i<n; i++) {
                    var hour=document.createElement('div');
                    hour.className='hours';
                    hour.data=massDoctors[key].in+i;
                    hour.innerHTML=massDoctors[key].in+i;
                    $('#time-dashboard').append(hour);
                }
           }
       }
   });
   });
    var slider = document.getElementById('range-input');
    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        step: 1,
        range: {
            'min': 0,
            'max': 100
        },
        // format: wNumb({
        //     decimals: 0
        // })
    });
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    var out='';
    $('#record').on('click', function(){
        // var hours=$('.hours:checked').data();
        var hours=$('.hours').inArray('.hours').data();
        console.log(hours);
        var doctor=$('#doctors').val();
        out+=hours+',';
        localStorage.setItem(doctor+'start',out);

    })

});
