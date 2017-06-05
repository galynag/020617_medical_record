$(document).ready(function(){
    var massDoctors={};

    $.getJSON('doctors.json', function(data) {
       massDoctors=data;
       console.log(massDoctors);
       $('#doctors').on('change', timeDashboard);

   });

    function timeDashboard(){
        $('#time-dashboard').empty();
        for (var key in massDoctors) {
            var doctorInputVal=$('#doctors').val();
            if(key==doctorInputVal) {
                var doctor=document.createElement('h4');
                doctor.innerHTML=key;
                $('#time-dashboard').append(doctor);
                $('#time-dashboard').append('<p>Часы приема</p>');
                var n=massDoctors[key].out-massDoctors[key].in;
                for ( var i=0; i<n; i++) {
                    var hour=document.createElement('div');
                    hour.className='hours';
                    hour.innerHTML=massDoctors[key].in+i;
                    $('#time-dashboard').append(hour);
                    $('.hours').eq(i).attr('data',("0"+(massDoctors[key].in+i)));
                    var busyTime=localStorage.getItem(key);
                    if (busyTime!=null){
                        if (busyTime.indexOf(("0"+(massDoctors[key].in+i)))>=0) {
                            $('.hours').eq(i).attr('disable','disabled').addClass('busy');
                        }
                    }

                }
            }
        }
        $('.hours').on('click',check);
    }

    $('#record').on('click', function(){
        var out='';
        var doctor=$('#doctors').val();
        out+=localStorage.getItem(doctor);
       $('div.hours').map(function(){
            if ($(this).hasClass('checked')){
                console.log('str out',out);
                out+=$(this).attr('data')+',';
            }
       });
        localStorage.setItem(doctor,out);
        timeDashboard();
    })

     function check() {
         $(this).addClass('checked');//display the blocks of hours was checked  to user
    }

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

});
