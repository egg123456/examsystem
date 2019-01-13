$(function(){
    $("a").on("click",function(ev){
        ev.preventDefault();
        var oldValue = $("a").html();
        // alert(oldValue);
        $("input").css("display","block");
        $("input").val(oldValue);
        $("a").css("display","none");
    })

    $("input").on("keydown blur",function(ev){
       if(ev.type=="keydown"&&ev.keyCode==13){
           var realVal = $("input").val();
           $("a").css("display","block").html(realVal);
           $("input").css("display","none");
       }else if(ev.type=="blur"){
           var realVal = $("input").val();
           $("a").css("display","block").html(realVal);
           $("input").css("display","none");
       }
    })
})