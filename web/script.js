var numofzeros=1;
      var numofpoles=1;
      var numofconjpole=0;
      var numofconjzero=0;
      var showAllpass=false;
      var listofAllpass=['2+2i','2-2i','1+2i','2+i'];
      var listforAllingAllpass={
        0:"f", 1:"f",2:"f",3:"f"}
        numofAllpassapplied=0;
      var numofAllpass=4;
      var systemgain=1;
      var poles=new Array;
      var zeros= new Array;  
      const new_zero = document.getElementById('new_zero');
      const new_pole=document.getElementById('new_pole');
      let startX, startY, elementX, elementY, element,currrent;
      var Zoperator = new Array(100);
      var conjpolestem=new Array;
      var conjzerostem=new Array;
      var freqAxis = new Array(100);
      let thershold=115;

      for(let i = 0; i <= 100; i++){
          Zoperator[i] = math.complex(math.cos(math.PI * (i/100)), math.sin(math.PI * (i/100)));
          freqAxis[i] = Math.PI * (i/100);
      }
      
      function addOrRemove(Allpass,index,Value){
        if(Allpass.checked){
          listforAllingAllpass[index]=Value;
          numofAllpassapplied+=1;
        }else{
          listforAllingAllpass[index]="f";
          numofAllpassapplied-=1;
          addAllpassResponse("allpasslib")
        }
        addAllpassResponse("compo");

      }
      function addAllpassResponse(fromwhere){
        let withAllpass=document.querySelector("#allPassEffect")
        if(fromwhere=="allpasslib"){
          let Allpass=document.querySelectorAll(".Allpass")
          for(let i=0;i<Allpass.length;i++){
            Allpass[i].parentNode.removeChild(Allpass[i]);
          }
        }else{
        if(withAllpass.checked&&(numofzeros!=0&&numofpoles!=0)){
          for(let i=0;i<numofAllpass;i++){
            console.log(listforAllingAllpass[i]);
            if(!Object.is(listforAllingAllpass[i],"f")){
              let poleValue = math.complex(listforAllingAllpass[i]);
            let zeroValue = math.divide(math.complex(1,0), math.conj(poleValue));
              let Allpass=document.getElementById("All_pass");
              Allpass.insertAdjacentHTML('beforeend',
              `<image  id="zero" class="Allpass"  x="${50*math.re(zeroValue)+115}" y="${115-50*math.im(zeroValue)}"width="10" height="10" xlink:href="images/zero.png"></image>`);
              Allpass.insertAdjacentHTML('beforeend',
              `<image  id="pole" class="Allpass" x="${50*math.re(poleValue)+115}" y="${115-50*math.im(poleValue)}"width="10" height="10" xlink:href="images/pole.png"></image>`);
          }}
         
        }else{
          let Allpass=document.querySelectorAll(".Allpass")
          for(let i=0;i<Allpass.length;i++){
            Allpass[i].parentNode.removeChild(Allpass[i]);
          }
        }
      }
        design_responses();
      }
       
      function Conjugates(){
        const conjugatep_z = document.getElementById('conjugate');
          if(conjugatep_z.checked){
            addconjpole();
            addconjzero();
            thershold=110
            }else{
              deletingall(numofconjzero,numofconjpole,"conj_zero","conj_pole");
              thershold=115
            }   
            design_responses();
            }
      design_responses();
      drag(new_pole,"pole");
      drag(new_zero,"zero");
      document.getElementById("zerobutton").onclick = function() {addnewzero()};
      document.getElementById("polebutton").onclick = function() {addnewpole()};
      document.getElementById("clear").onclick = function() {deletingall(numofzeros,numofpoles,"zero","pole")};

      function addnewzero(){
        let Existing=document.getElementById("new_zero");
        Existing.insertAdjacentHTML('beforeend',
         `<image  id="zero" class="draggable" type="zero${numofzeros}" x="115" y="115" width="10" height="10" xlink:href="images/zero.png"></image>`);
        numofzeros+=1;
        const conjugatep_z = document.getElementById('conjugate');
          if(conjugatep_z.checked){
            addconjzero();
            }     
        design_responses();
      }

      function addnewpole(){
        let Existing=document.getElementById("new_pole");
        Existing.insertAdjacentHTML('beforeend', 
        `<image id="pole" class="draggable" type="pole${numofpoles}"  x="115" y="115" width="10" height="10" xlink:href="images/pole.png"></image>`);
        numofpoles+=1;
        const conjugatep_z = document.getElementById('conjugate');
          if(conjugatep_z.checked){
            addconjpole();
            }     
        design_responses();
      }

      function addconjpole(){
      if(numofpoles!=0){
         if(numofconjpole!=numofpoles){
          if(numofconjpole==1){
            let conjpole=document.getElementById("conj_pole");
            conjpole.parentNode.removeChild(conjpole);
            }else if (numofconjpole>1){
             let conjpolesn=document.querySelectorAll("#conj_pole");
             for(let i=0;i<conjpolesn.length;i++){
                var conj=conjpolesn[i];
                conj.parentNode.removeChild(conj);
            }    
         }   
          let pole_list=document.querySelectorAll('#pole');
          let conjp=document.getElementById("conj_p");
        for (var i = 0; i <numofpoles; i++) {
                    var node = pole_list[i];
                    if(node.parentNode=document.querySelector("#new_pole")){
                    let tem=`<image id="conj_pole" type="${node.getAttribute("type")}" class="notdraggable"  x="${node.getAttribute("x")}"
                       y="${230-node.getAttribute("y")}" width="10" height="10" xlink:href="images/pole.png"></image>`;
                       if(node.getAttribute("y")==115){
                      node.setAttribute("y",`${node.getAttribute("y")-5}`)
                      tem=`<image id="conj_pole" type="${node.getAttribute("type")}" class="notdraggable"  x="${node.getAttribute("x")}"
                       y="${230-node.getAttribute("y")}" width="10" height="10" xlink:href="images/pole.png"></image>`;               
                           }
                       conjp.insertAdjacentHTML('beforeend',tem);

          }}
          numofconjpole=numofpoles;

        }
      }
      }
      function addconjzero(){
      if(numofzeros!=0){
        try{
         if(numofconjzero!=numofzeros){
          if(numofconjzero==1){
            let conjzero=document.getElementById("conj_zero");
            conjzero.parentNode.removeChild(conjzero);
            }else if (numofconjzero>1){
             let conjzerosn=document.querySelectorAll("#conj_zero");
             for(let i=0;i<conjzerosn.length;i++){
                var conj=conjzerosn[i];
                conj.parentNode.removeChild(conj);
            }    
         }            
          let zero_list=document.querySelectorAll('#zero');
          let conjz=document.getElementById("conj_z");
          let  conjzeros=document.querySelectorAll("#conj_zero");
        for (var i = 0; i < numofzeros; i++) {
                    var node = zero_list[i];
                    if(node.parentNode=document.querySelector("#new_zero")){
                    let tem=`<image id="conj_zero" type="${node.getAttribute("type")}" class="notdraggable"  x="${node.getAttribute("x")}"
                       y="${230-node.getAttribute("y")}" width="10" height="10" xlink:href="images/zero.png"></image>`;
                    if(node.getAttribute("y")==115){
                      node.setAttribute("y",`${node.getAttribute("y")-5}`)
                      tem=`<image id="conj_zero" type="${node.getAttribute("type")}" class="notdraggable"  x="${node.getAttribute("x")}"
                       y="${230-node.getAttribute("y")}" width="10" height="10" xlink:href="images/zero.png"></image>`;               
                           }
                       conjz.insertAdjacentHTML('beforeend',tem);
                    }  }
                    numofconjzero=numofzeros;
          }
        }catch(er){
          console.log("Error in addconj",er);
        }}
      }
      
      function addNewAllpass() {
        try{
    let target = document.getElementById("allpass_lib");
    let input = document.getElementById("NewAllPassValue").value;

    for(var i=0;i<listofAllpass.length;i++){
      if(Object.is(input,listofAllpass[i])){
        return;
      }
    }
    listofAllpass.push(input);
    target.insertAdjacentHTML('beforeend',"<li><a href=\"#\" ondblclick=\"showZplaneForAllPass('" + input + "')\" ><i class=\"lni lni-text-format\" ></i><span >  → a =  " + input +"</span></a>\
        <input type=\"checkbox\" onclick=\"addOrRemove(this,"+numofAllpass+", '" + input + "')\"></li>");  
        listforAllingAllpass[numofAllpass]="f";
        numofAllpass+=1;
    
     }catch{
        
    }}

      function deletingall(numofzero,numofpole,zeroid,poleid){
        try{
        if(numofzero==1){
          let zero=document.getElementById(zeroid);
          zero.parentNode.removeChild(zero);
        }else if(numofzero==0) {}
        else{
          let zero_list=document.querySelectorAll(`#${zeroid}`);
          for (var i = 0; i < zero_list.length; i++) {
                  var node = zero_list[i];
                  node.parentNode.removeChild(node);
           }
          }
          
          if(numofpole==1){
          let pole=document.getElementById(poleid);
          pole.parentNode.removeChild(pole);
        }else if(numofpole==0) {}
        else{
          let pole_list=document.querySelectorAll(`#${poleid}`);
          for (var i = 0; i < pole_list.length; i++) {
                  var node = pole_list[i];
                  node.parentNode.removeChild(node);
           }
          }
          let withAllpass=document.querySelector("#allPassEffect")
           if(withAllpass.checked&&numofconjzero==0){
            let Allpass=document.querySelectorAll(".Allpass")
            for(let i=0;i<Allpass.length;i++){
            Allpass[i].parentNode.removeChild(Allpass[i]);}
           }
           if(poleid=="pole"){
            numofpoles=0;
            numofzeros=0;
            drawresponse();
           }
          const conjugatep_z = document.getElementById('conjugate');
          if(conjugatep_z.checked){
            $('input[id="conjugate"]').prop("checked", false);
            deletingall(numofconjzero,numofconjpole,"conj_zero","conj_pole");
            let withAllpass=document.querySelector("#allPassEffect")
            let Allpass=document.querySelectorAll(".Allpass")
            $('input[id="allPassEffect"]').prop("checked", false);
            for(let i=0;i<Allpass.length;i++){
            Allpass[i].parentNode.removeChild(Allpass[i]);}
           }
           numofconjzero=0;
          numofconjpole=0;
          
        }catch{
           console.log("Error in deletingAll")
        }
      }
      oncontextmenu = (e) => {
        try{
           const typeName = e.target.getAttributeNS(null, 'type');
           const idName = e.target.getAttributeNS(null, 'id');
           let objec=document.getElementById(idName);
           if (idName=="zero"||idName=="pole"){
            e.preventDefault()
            let menu = document.createElement("div")
            menu.id = "ctxmenu"
            menu.style = `top:${e.pageY-300};left:${e.pageX}`
            console.log("on click");
            menu.onmouseleave = () => ctxmenu.outerHTML = '';
            menu.innerHTML = `<p id="del">delete</p>`;
            document.body.appendChild(menu);
            document.getElementById("del").onclick = function() {deleting(typeName,idName)};
           }
          }
           catch{
             console.log("Error in oncontextmenu");
           }
              }; 
            function deleting(type,id){
            try{        
              let ctxmenu=document.getElementById("ctxmenu");
              ctxmenu.outerHTML = '';
              let node_list=document.querySelectorAll(`#${id}`);
              for (var i = 0; i < node_list.length; i++) {
                  var node = node_list[i];
                  if (node.getAttribute('type') == type) {
                    node.parentNode.removeChild(node);
                  } 
                }
                node_list=document.querySelectorAll(`#conj_${id}`);

                for (var i = 0; i < node_list.length; i++) {
                  var node = node_list[i];
                  if (node.getAttribute('type') == type) {
                    node.parentNode.removeChild(node);
                    if(id=="pole"){
                      numofconjpole-=1;
                }else{
                  numofconjzero-=1;

                }
                  } 
                }
                if(id=="pole"){
                  numofpoles-=1;
                }
                 else{
                  numofzeros-=1;
                }
                if(numofpoles==0&&numofzeros==0){
                  $('input[id="conjugate"]').prop("checked", false);
                  $('input[id="allPassEffect"]').prop("checked", false);
                  drawresponse();
                 }else{
                  design_responses();
                 }
            }  
         
         catch{
           console.log("Aaa");
         }
        }
        

      function showZplaneForAllPass(a) {
          if(a != '') {
              clearAllpass();          
              let zeroValue = math.divide(math.complex(1,0), math.conj(math.complex(a)));
              let poleValue = math.complex(a);
              let Existing=document.getElementById("All_pass_graph");
              Existing.insertAdjacentHTML('beforeend',
              `<image  id="All_pass" class="zero"  x="${50*math.re(zeroValue)+115}" y="${115-50*math.im(zeroValue)}"width="10" height="10" xlink:href="images/zero.png"></image>`);
              Existing.insertAdjacentHTML('beforeend',
              `<image  id="All_pass"   class="pole" x="${50*math.re(poleValue)+115}" y="${115-50*math.im(poleValue)}"width="10" height="10" xlink:href="images/pole.png"></image>`);
              showAllpass=true;
              drawAllpassresponse(a);
        }
      }
      function clearAllpass(){
        if(showAllpass){
              let All_pass=document.querySelectorAll("#All_pass");
              for(var i=0;i<All_pass.length;i++){
                All_pass[i].parentNode.removeChild(All_pass[i]);
              }
              showAllpass=false;
            }
      }


      function drag(svg,curr){
        svg.addEventListener('mousedown', e => {
            startX = e.offsetX;
            startY = e.offsetY;
            element = e.target;
            elementX = +element.getAttributeNS(null, 'x');
            elementY = +element.getAttributeNS(null, 'y');
            svg.addEventListener('mousemove', onMouseMove);
            currrent=e.target.getAttributeNS(null, 'id');
        });
        svg.addEventListener('mouseup', e => {
            svg.removeEventListener('mousemove', onMouseMove);
        });
       } 

      onMouseMove = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        if ((elementY + y - startY)>thershold){
        element.setAttributeNS(null, 'y', thershold);
        }else{
          element.setAttributeNS(null, 'y', elementY + y - startY);
        }
        element.setAttributeNS(null, 'x', elementX + x - startX);
        if(currrent=="pole"&&document.querySelector("#conjugate").checked){
      let conjpoles=document.querySelectorAll("#conj_pole");
      for(var i=0;i<conjpoles.length;i++){
        if(conjpoles[i].getAttribute("type")==element.getAttributeNS(null,"type")){
          conjpoles[i].setAttribute("x",element.getAttributeNS(null,"x"));
          conjpoles[i].setAttribute("y",`${230-element.getAttributeNS(null,"y")}`);
         }
        }
       } 
       if(currrent=="zero"&&document.querySelector("#conjugate").checked){

      let conjzeros=document.querySelectorAll("#conj_zero");
      for(var i=0;i<conjzeros.length;i++){
        if(conjzeros[i].getAttribute("type")==element.getAttributeNS(null,"type")){
          conjzeros[i].setAttribute("x",element.getAttributeNS(null,"x"));
          conjzeros[i].setAttribute("y",`${230-element.getAttributeNS(null,"y")}`);
         }
        }
       } 
        design_responses();
      };
    
      function drawAllpassresponse(a){
        if(showAllpass){
        let phaseResponse = [];
        let zero = math.divide(1, math.conj(math.complex(a)));
        let pole = math.complex(a);
        let x=0;
        let y=0;
        for(let i = 0; i <=100; i++){
            let phasePoint = 0;
            let Numeratordic = math.subtract(Zoperator[i],zero);
            phasePoint += Numeratordic.arg();
            let  denomdic = math.subtract(Zoperator[i], pole);
            phasePoint -= denomdic.arg();
            phaseResponse.push(phasePoint);
          }
        let phasepoints = [];
        var maxPhase = Math.max(...phaseResponse);
    
        for(let i = 0; i < 100; i++){
            // console.log(magResponse[i]);
            phasepoints.push([freqAxis[i],phaseResponse[i]]);
            // console.log(phaseResponse[i]);
        }
        for(let i = 0; i <zeros.length; i++){
          systemgain=phaseResponse[0]/zeros[i];
        }
        for(let i = 0; i <poles.length; i++){
          systemgain=phaseResponse[0]*poles[i];
        }


        var container = document.getElementById('allpass_phase_response');
        graph = Flotr.draw(container, [ phasepoints ],{title:"Phase Response",xaxis:{title:"frequency"},yaxis:{title:"Φº"}});

      }}
      function design_responses(){
        let magResponse = [];
        let phaseResponse = [];
        poles=[];
        zeros=[];
        for(let i = 0; i <= 100; i++){
            let magPoint = 1;
            let phasePoint = 0;
            let x=0;
            let y=0;
            let Allpass=document.querySelector("#allPassEffect")
            for(let j = 0; j <numofzeros+numofconjzero; j++){
                    if(numofzeros==1&&j==0){
                      let zero = document.getElementById('zero');
                      x=parseInt(zero.getAttribute("x"));
                      y=parseInt(zero.getAttribute("y"));
                      if(i==0){
                      zeros.push([(x-115)/100, (115-y)/100]);
                      if((115-y)/100!=0){
                        zeros.push([(x-115)/100, -(115-y)/100])
                      }
                      }

                    }else if(numofconjzero==1&&j==1){
                      let conj = document.getElementById('conj_zero');
                      x=parseInt(conj.getAttribute("x"));
                      y=parseInt(conj.getAttribute("y"));
                      if(i==0){
                      zeros.push([(x-115)/100, (115-y)/100]);
                      if((115-y)/100!=0){
                        zeros.push([(x-115)/100, -(115-y)/100])
                      }
                      }
                    }
                    else{
                      let zerosv = document.querySelectorAll('#zero,#conj_zero');
                      x=parseInt(zerosv[j].getAttribute("x"));
                      y=parseInt(zerosv[j].getAttribute("y"));
                      if(i==0){
                      zeros.push([(x-115)/100, (115-y)/100]);
                      if((115-y)/100!=0){
                        zeros.push([(x-115)/100, -(115-y)/100])
                      }
                      }                 
                        }
                    let Numeratordic = math.subtract(Zoperator[i], math.complex((x-115)/100, (115-y)/100));
                    magPoint *= Numeratordic.abs();
                    phasePoint += Numeratordic.arg();
              }
              for(let j = 0; j < numofpoles+numofconjpole; j++){
                  if(numofpoles==1&&j==0){
                    let pole = document.getElementById('pole');
                      x=parseInt(pole.getAttribute("x"));
                      y=parseInt(pole.getAttribute("y"));
                      if(i==0){
                      poles.push([(x-115)/100, (115-y)/100]);
                      if((115-y)/100!=0){
                        poles.push([(x-115)/100, -(115-y)/100])
                      }
                      }
                  }else if(numofconjpole==1&&j==1){
                      let conj = document.getElementById('conj_pole');
                      x=parseInt(conj.getAttribute("x"));
                      y=parseInt(conj.getAttribute("y"));
                      if(i==0){
                      poles.push([(x-115)/100, (115-y)/100]);
                      if((115-y)/100!=0){
                        poles.push([(x-115)/100, -(115-y)/100])
                      }
                      }
                  }
                  else{
                    let polesv = document.querySelectorAll("#pole,#conj_pole");
                    x=parseInt(polesv[j].getAttribute("x"));
                    y=parseInt(polesv[j].getAttribute("y"));
                    if(i==0){
                        poles.push([(x-115)/100, (115-y)/100]);
                        if((115-y)/100!=0){
                        poles.push([(x-115)/100, -(115-y)/100])
                      }
                        }
                  }
                    let  denomdic = math.subtract(Zoperator[i], math.complex((x-115)/100, (115-y)/100));
                    magPoint /= denomdic.abs();
                    phasePoint -= denomdic.arg();
              }
              if(Allpass.checked&&numofAllpassapplied!=0){
            for(let j = 0; j < numofAllpass; j++)
            {
                if(!(Object.is(listforAllingAllpass[j],"f"))){
                  // console.log("asssssssssssssssssssssss")
                let temp = math.subtract(Zoperator[i],math.divide(1, math.conj(math.complex(listforAllingAllpass[j]))));
                phasePoint += temp.arg();
                temp =  math.subtract(Zoperator[i],math.complex(listforAllingAllpass[j]));
                phasePoint -= temp.arg();
            }
          }
        }
              magResponse.push(magPoint);
              phaseResponse.push(phasePoint);
          }
        if(numofzeros==0&&numofpoles==0){
          drawresponse();
          return ;
        }else{
        let magpoints = [];
        let phasepoints = [];
        for(let i = 0; i <= 100; i++){
          magpoints.push([freqAxis[i], magResponse[i]]);
            // console.log(magResponse[i]);
            phasepoints.push([freqAxis[i], phaseResponse[i]]);
        }
        drawresponse(magpoints,phasepoints);

      }
    }
       function  drawresponse(magpoints=[],phasepoints=[]){ // plot mag_response
        var container = document.getElementById('mag_response');
        graph = Flotr.draw(container, [ magpoints ],{ title:"Magnitude Response",xaxis: { title:"Frequency",max : math.PI, min : 0},yaxis:{title:"|Z|"} });
        
        // plot phase_response
        var container2 = document.getElementById('phase_response');
        graph = Flotr.draw(container2, [ phasepoints ],{title:"Phase Response",xaxis:{title:"frequency"},yaxis:{title:"Φº"}});
      }
      let x=[]
      let y=[]
      let processing_speed=document.getElementById("processing speed");
      let start=0;
      let end=3000;
      let y_filter=[];


      function showFile(input) {
            let x_axis=[]
            let y_axis=[]
            let m=[]
            let f=[]
            let data=[]
            let file = input.files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
            let r=reader.result.split("\r");
            for(let i =1; i<r.length;i++){
        m.push(r[i].split("\n"))
    }
            for(let i =1; i<m.length;i++){
            f.push(m[i][1].split(" "))
             }
    
            for(let i =1; i<(f.length);i++){
                data.push([parseFloat(f[i][0]),parseFloat(f[i][1])]);
            }

            for(let i =1; i<(data.length);i++){
                x.push(data[i][0]);
                y.push(data[i][1]);
             }
    
            let container = document.getElementById('signal');
    

             function compute(){
                start=start+parseInt(processing_speed.value)
                end=parseInt(processing_speed.value)+end;
                if(end>50000){
                    end=3000;
                    start=0;
                 }
                x_axis=x.slice(0,end);
                y_axis=y.slice(0,end);
              }

              function update () {
                compute();
                
                Plotly.newPlot(container, [{
                x: x,
                y: y,
                mode: 'lines',
                fill: 'toself',
                showlegend: true,
                line: {simplify: false}
              }], {
                xaxis: {range: [x[start], x[end]]},
                yaxis: {range: [-0.9, 0.9]}
              })

                Plotly.animate(container, {
                  data: [{x: x_axis, y: y_axis}]
                },{
                  transition: {
                    duration: 0
                  },
                  frame: {
                  
                    duration: 200,
                    redraw: true
                  }
                });

                requestAnimationFrame(update);
                            }

                  requestAnimationFrame(update);


              };

              reader.onerror = function() {
                console.log(reader.error);
              };

      }
      async function pyfunc(){
            let factors= await eel.getfactorx(zeros,poles,systemgain)();
            //  let y_factor=await eel.getfactory(zeros,poles,systemgain)();
            let x_factor=new Array;
            let y_factor=new Array;
            for(let i=0;i<factors[0].length;i++){
              x_factor.push(math.complex(factors[0][i][0],factors[0][i][1]))
            }
            for(let i=0;i<factors[1].length;i++){
              y_factor.push(math.complex(factors[1][i][0],factors[1][i][1]))
            }
          for (let i = 0; i < y.length; i++) {
              y_filter.push(0);
          }
          for (let i = 0; i < y.length; i++) {
              
          for (let j = 1; j <= y_factor.length; j++) {
            if((i-j)<0){continue;}
            y_filter[i]=math.add(y_filter[i],math.multiply(y_factor[j-1],y_filter[i-j],-1));

          }
          for (let j = 0; j < x_factor.length; j++) {
            if((i-j)<0){continue;}
            y_filter[i]=math.add(y_filter[i],math.multiply(x_factor[j],y[i-j]));
          }
          y_filter[i]=y_filter[i].re;
          if(i<50){
            console.log(y[i],`input at time ${i}`);
            console.log(y_filter[i],`output at time ${i}`);
          }
          }
       }
      function filter(){
        let x_axis=[]
        let y_axis=[]
        let container1 = document.getElementById('filtered_signal');
        function compute(){
          x_axis=x.slice(0,end);
          y_axis=y_filter.slice(0,end);
        }
        pyfunc();
        function update () {
          compute();
          Plotly.newPlot(container1, [{
          x: x,
          y: y_filter,
          mode: 'lines',
          fill: 'toself',
          showlegend: true,
          line: {simplify: false}
          }], {
          xaxis: {range: [x[start], x[end]]}
          })
          Plotly.animate(container1, {
            data: [{x: x_axis, y: y_axis}]
          },{
            transition: {
              duration: 0
            },
            frame: {
              duration: 200,
              redraw: true
            }
          });
          requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      }

 
 