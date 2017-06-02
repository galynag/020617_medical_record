;
$(document).ready(function(){
    var massDoctors={};
   $.getJSON('doctors.json', function(data) {
       massDoctors=data;
       console.log(massDoctors);
       $('#doctors').on('change', function(){
           $('#time-dashboard').empty();
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
                    // hour.atr('data',massDoctors[key].in+i);
                    hour.innerHTML=massDoctors[key].in+i;
                    $('#time-dashboard').append(hour);
                    $('.hours').eq(i).attr('data',("0"+(massDoctors[key].in+i)));
                    var busyTime=localStorage.getItem(key);
                    console.log('busyTime',busyTime, typeof(busyTime));
                    console.log(massDoctors[key].in+i);
                    console.log('div',$('.hours').eq(i));
                    if (busyTime==null){break};
                    if (busyTime!=null){
                        if (busyTime.indexOf(("0"+(massDoctors[key].in+i)))>=0) {
                            $('.hours').eq(i).attr('disable','disabled').addClass('busy');
                        }
                    }

                }
           }
       }
           $('.hours').on('click',check);
   });

   });


    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('#record').on('click', function(){
        var out='';
        var doctor=$('#doctors').val();
        out+=localStorage.getItem(doctor);
       $('div.hours').map(function(){


            if ($(this).hasClass('checked')){
           // console.log($(this).attr('data'));
           out+=$(this).attr('data')+',';


            }
       });

        console.log(out);
        localStorage.setItem(doctor,out);
        // var doctor=$('#doctors').val();
        // out+=hours+',';
        // localStorage.setItem(doctor+'start',out);

    })

     function check() {
         $(this).addClass('checked');
    }
console.log(("0"+(~~(Math.random()*12+1))).substr(-2,2));

});
