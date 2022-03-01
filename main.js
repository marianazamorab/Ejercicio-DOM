const url= "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

fetch(url)
.then(response => response.json())
.then(data => {

    class event{
        constructor(name, mcc, tp, tn, fp, fn){
            this.name=name;
            this.mcc=mcc;
            this.tp=tp;
            this.tn=tn;
            this.fp=fp;
            this.fn=fn;
        }  
    }

    const nev=[];
    const ev = [];
    
    let eve;
    let cont = 1;
    let str;
    var html;
    data.forEach(element => {
        if(element['squirrel']==true){
            html+='<tr class="table-danger">'; 
        }
        else{
            html+='<tr>';
        }
        html+= '<th scope="row">'+cont+'</th>';
        str="";
        element['events'].forEach(e =>{
            str+=e+", ";
            if (!nev.includes(e)){
                nev.push(e);
                eve= new event(e,0,0,0,0,0);
                ev.push(eve);
            }   
        })
        cont++;
        html+= "<td>"+str+"</td>";
        html+= "<td>"+element['squirrel']+"</td>";
        html+="</tr>"
    });
    document.querySelector('#t1').innerHTML = html;

    let b;
    data.forEach(element => {
        ev.forEach(e => {
            b= false;
            element['events'].forEach(el =>{
                if(e.name == el){
                    b=true;
                }        
            })   
            if(b==true){
                if(element['squirrel']==true){
                    
                    e.tp++;
                    
                }
                else{
                    e.fn++;
                }                 
            }
            else{
                if(element['squirrel']==true){
                    e.fp++;
                }
                else{
                    e.tn++;
                }
            }
        })
    })

    html="";
    cont=1;
    ev.forEach(e =>{
        html+='<tr>';
        html+= '<th scope="row">'+cont+'</th>';
        html+='<td>'+ e.name+ '</td>';
        e.mcc= ((e.tp*e.tn)-(e.fp*e.fn))/((e.tp+e.fp)*(e.tp+e.fn)*(e.tn+e.fp)*(e.tn+e.fn))**(1/2);
        html+='<td>'+ e.mcc+ '</td>';
        html+='</tr>';
        cont++;
    })
    document.querySelector('#t2').innerHTML = html;
    
})
.catch(err=>console.log(err))