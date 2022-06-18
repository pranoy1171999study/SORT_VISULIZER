var choose_sort;
var time_interval=500;
var swap_color="red";
var original_color="cadetblue";
    original_color="rgb(213, 166, 46)";
var choose_color="green";
var hold_color="yellow";
var arr;
var arrDataset=new Array();
var midline=0;
var barContainerHeight=280;
var box_size=0;
var set=document.getElementById("set");
var getArray=document.getElementById("get-array");
var showArray=document.getElementById("show-array");
var showArrayBars=document.getElementById("array-bars");
var notice=document.getElementById("notice");

/*function setBarStyle()
{
    var ele=document.getElementById("bar-style");
    var target=document.getElementsByClassName("array-bar");
    if(ele.value==1)
    {
        target.style.borderTopLeftRadius="40%";
        target.style.borderTopRightRadius="40%";
    }
    else{
        target.style.borderTopLeftRadius = "25px";
        target.style.borderTopRightRadius="0px";
    }


}*/
set.onclick=function(){
                set.disabled=true;
                //setBarStyle();
                choose_sort=document.getElementById("choose-sort").value;
                time_interval=document.getElementById("get-time").value;
                arr=new Array();
                box_size=0;
                var rawText=getArray.value;
                console.log(rawText.length);
                if(rawText=="")
                {
                    showArray.innerHTML="<div>please input array!!!</div>";
                    console.log("empty");
                }
                else{
                    refineArray(rawText);
                    showArrfun();
                    setArrayDataset();
                }
                
}
//set array in the box
function showArrfun()
{
    console.log(box_size);
    box_size*=15;
    var htmlarray="";
    var boxstart="<div class='arr-box' style='width:"+box_size+"px;'>";
    var boxend="</div>";
    arr.forEach(arrtodiv);
    function arrtodiv(item)
    {
        htmlarray+=boxstart+item+boxend;
        console.log(htmlarray);
    }
    htmlarray+=" ";
    //console.log(htmlarray);
    showArray.innerHTML=htmlarray;
    
}

//getting array from raw text
function refineArray(rawText)
{
    rawText+=" ";
    var c=0;
    var temp="";
    for(var i=0;i<rawText.length;i++)
    {
        if(i>0)
        {
            if(rawText[i]=='-'&&rawText[i-1]=='-')
            {
                showArray.innerHTML="<div>please correct the input!!</div>";
                break;
            }
        }
        if(c>29)
        {
            //as max no of element is 10
            break;
        }
        if(rawText[i]>='0'&&rawText[i]<='9'||rawText[i]=='-')
        {
            temp=temp+rawText.substr(i,1);
        }
        else if(rawText[i]==','||rawText[i]==' ')
        {
            if(temp!="")
            {
                //use to predict box size as all block of array have same size
                if(temp.length>box_size) box_size=temp.length;

                //console.log("c2");
                arr[c]=Number(temp);
                c++;
            }
            temp="";
        }
    }
}
function setArrayDataset(){
    var max=arr[0];
    var min=arr[0];
    for(var i=0;i<arr.length;i++)
        arrDataset[i]={"val":"1","height":"1"};
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]>max) max=arr[i];
        if(arr[i]<min) min=arr[i];
    }
    var ratio=1;
    //set sacle ie,height accroding to our view section height
    if(min>=0) ratio=max/(barContainerHeight-20);
    else if(min<0&&max>0) ratio=(max-min)/(barContainerHeight-20);
    else ratio=-min/(barContainerHeight-20);

    //to handle -ve & +ve cases +ve are lie over midline & -ve are below midline
    if(min>=0) midline=0;
    else if(min<0&&max<0)  midline=barContainerHeight-20;
    else midline=(Math.abs(min)/(max-min))*barContainerHeight;

    //console.log(midline);
    //to handle text box of height 20px
    midline+=20;
    
    var textboxHeightHandle=0;
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]>=0) textboxHeightHandle=20;
        else textboxHeightHandle=-20;

        arrDataset[i].val=arr[i];
        arrDataset[i].height=(arr[i]/ratio)+textboxHeightHandle;
    }
    console.log(arrDataset);
    generateIdandBars();
}
function generateIdandBars(){
    notice.style.visibility="visible";
    var width=100/arr.length;
    var barHtmlData="";
    var midlineHandaler=0;
    for(var i=0;i<arr.length;i++)
    {
        //set midline value accroding sign of the data
        if(arrDataset[i].val>=0){
            midlineHandaler=midline;
        }else{
            midlineHandaler=midline+arrDataset[i].height;
        }
        
        var singlebar="<div class='array-bar-container' style='width:"+width+"%;'><div class='array-bar' id='"+i.toString()+"'style='bottom:"+midlineHandaler+"px; height:"+Math.abs(arrDataset[i].height)+"px;'><div class='array-bar-txt' id='tb"+i.toString()+"'>"+arrDataset[i].val+"</div></div></div>";
        barHtmlData+=singlebar;
    }


//console.log(barHtmlData);
var temp=arrDataset;
//console.log(temp);
//bubbleSort(temp);
//insertionSort(temp);
//show sort algorithm
if(choose_sort==1){
    //bubble sort
     showArrayBars.innerHTML=barHtmlData;
    bubbleSort(temp);
}else if(choose_sort==2){
    //insertion sort
    showArrayBars.innerHTML=barHtmlData;
    insertionSort(temp);
}
else if(choose_sort==3){
    //merge sort
    mergeSort(arr);
}
else if(choose_sort==4){
    //quick sort
    quickSort(arr);
}
}



//sorting algorithms
function resetBar(data,id)
{
    ele=document.getElementById(id.toString());
    eletext=document.getElementById("tb"+id.toString());
    var midlineHandaler=0;
    if(data.val>=0){
        midlineHandaler=midline;
    }else{
        midlineHandaler=midline+data.height;
    }
    ele.style.height=Math.abs(data.height)+"px";
    ele.style.bottom=midlineHandaler+"px";
    eletext.innerText=data.val;

}
/*bubble sort----------------------------------------------------------------------------------------------------------------*/
/*bubble sort----------------------------------------------------------------------------------------------------------------*/
async function bubbleSort(sarray){
    for(var i=0;i<sarray.length;i++)
    {
        for(var j=0;j<(sarray.length-i-1);j++)
        {
            //declaire targeted bar
            notice.innerText="comparing..";
            var b1=document.getElementById(j.toString());
            var b2=document.getElementById((j+1).toString());

            b1.style.backgroundColor=choose_color;
            b2.style.backgroundColor=choose_color;
            await new Promise(resolve => setTimeout(resolve, time_interval/2));
            if(sarray[j].val>sarray[j+1].val)
            {
                //highlight that bars which will be swap
                notice.innerText="swaping..";
                b1.style.backgroundColor=swap_color;
                b2.style.backgroundColor=swap_color;
                await new Promise(resolve => setTimeout(resolve, time_interval));

                var store=new Object();
                store=sarray[j];
                sarray[j]=sarray[j+1];
                sarray[j+1]=store;
                
                //after swaping set original colors also fix heights
                resetBar(sarray[j],j);
                resetBar(sarray[j+1],j+1)

                
                await new Promise(resolve => setTimeout(resolve, time_interval));
                
            }
            b1.style.backgroundColor=original_color;
            b2.style.backgroundColor=original_color;
        }
    } 
    notice.innerText="Sorted Array";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    notice.innerText="";
    notice.style.visibility="hidden";
    set.disabled=false;
}
/*insertion sort----------------------------------------------------------------------------------------------------------------*/
/*insertion sort----------------------------------------------------------------------------------------------------------------*/
async function insertionSort(sarray){
    for(var i=0;i<sarray.length;i++)
    {
        notice.innerText="set initial key..";
        var b1=document.getElementById(i.toString());
        var key=i;
        b1.style.backgroundColor=hold_color;
        await new Promise(resolve => setTimeout(resolve, time_interval)); 
        for(var j=i+1;j<sarray.length;j++)
        {
            notice.innerText="searching lesser key..";
            var b2=document.getElementById(j.toString());
            b2.style.backgroundColor=choose_color;
            await new Promise(resolve => setTimeout(resolve, time_interval/2));
            if(sarray[key].val>sarray[j].val)
            {
                notice.innerText="new key found..";
                document.getElementById(key.toString()).style.backgroundColor=original_color;
                key=j;
                b2.style.backgroundColor=hold_color;
            }
            if(j!=key)
                b2.style.backgroundColor=original_color;
            await new Promise(resolve => setTimeout(resolve, time_interval));
        }
        if(i!=key)
        {
            notice.innerText="swapping "+i+" & key";
            var ele=document.getElementById(key.toString());
            ele.style.backgroundColor=swap_color;
            b1.style.backgroundColor=swap_color;
            await new Promise(resolve => setTimeout(resolve, time_interval));

            var temp=new Object();
            temp=sarray[i];
            sarray[i]=sarray[key];
            sarray[key]=temp;

            resetBar(sarray[key],key);
            resetBar(sarray[i],i);
        }
        document.getElementById(key.toString()).style.backgroundColor=original_color;
        b1.style.backgroundColor=original_color;
    }
    notice.innerText="Sorted Array";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    notice.innerText="";
    notice.style.visibility="hidden";
    set.disabled=false;
    console.log(tarr);
}

/*merge sort----------------------------------------------------------------------------------------------------------------*/
/*merge sort----------------------------------------------------------------------------------------------------------------*/
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function mergeSort(tarr)
{
    var l=0;
    var r=tarr.length;
    

    var level=0;
    var n=r-l;

    while(n>Math.pow(2,level))
    {
        level++;
    }
    //level--;
 
    var lboxhtml="<div>";
    var c=0;
    console.log(l,r,n,level);
    while(c<=level)
    {
        var k=0;
        lboxhtml+="<div class='level' id=l"+c.toString()+">";
        var w=100/Math.pow(2,c);
        while(k<Math.pow(2,c))
        {
            
            lboxhtml+="<div class='levelbox' id='lb"+c.toString()+k.toString()+"' style='width:"+w+"%;'></div>";
            k++;
        }
        lboxhtml+="</div>";
        c++;
    }
    lboxhtml+="</div>";
    showArrayBars.innerHTML=lboxhtml;

    var tl=level;
    await recMergeSort(tarr,l,r-1,0,0,tl);
    notice.innerText="Sorted Array";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    notice.innerText="";
    notice.style.visibility="hidden";
    set.disabled=false;
}

async function recMergeSort(tarr,l,r,level,box,totallevel)
{
    await new Promise(resolve => setTimeout(resolve, time_interval));
        var w=90/((r-l+1));
        var eleboxhtml="";
        for(var i=l;i<=r;i++)
        {
            eleboxhtml+="<div class='recarrbox' id='eleb"+level.toString()+i.toString()+"' style='background-color:"+original_color+";width:"+w+"%;'>"+tarr[i]+"</div>";
        }

        targetlbox=document.getElementById("lb"+level.toString()+box.toString());
        targetlbox.innerHTML=eleboxhtml;
        targetlbox.style.visibility="visible";

    if(l<r){
        
        level++;
        var m=Math.floor(l+(r-l)/2);
        notice.innerText="Deviding into 2 parts";
        await recMergeSort(tarr,l,m,level,2*box);
        notice.innerText="Deviding into 2 parts";
        await recMergeSort(tarr,m+1,r,level,2*box+1);
        //targetlbox.innerHTML="<div></div>";
        notice.innerText="marging";
        await merge(tarr,l,m,r,level,2*box);
        //await timeout(1000);
        //after merge hide the box
    }
}
async function merge(tarr,l,m,r,level,box)
{
    await new Promise(resolve => setTimeout(resolve, time_interval));
    notice.innerText="Choosing small elements and marging..";
    var larr=new Array();
    var rarr=new Array();
    var n1=m-l+1;
    var n2=r-m;
    for(var i=0;i<n1;i++)
        larr[i]=tarr[l+i];
    for(var i=0;i<n2;i++)
        rarr[i]=tarr[m+1+i];
    var i=0,j=0,k=l;
    
    while(i<n1&&j<n2)
    {
        if(larr[i]<=rarr[j]){
            var chooseele=document.getElementById("eleb"+level.toString()+(l+i).toString());
            var parentele=document.getElementById("eleb"+(level-1).toString()+(k).toString());
            chooseele.style.backgroundColor="green";
            await new Promise(resolve => setTimeout(resolve, time_interval));
            parentele.style.backgroundColor="red";
            parentele.innerText=larr[i].toString();
            await new Promise(resolve => setTimeout(resolve, time_interval));
            chooseele.style.backgroundColor=original_color;
            parentele.style.backgroundColor=original_color;

            tarr[k]=larr[i];
            i++;
        }else{
            var chooseele=document.getElementById("eleb"+level.toString()+(m+1+j).toString());
            var parentele=document.getElementById("eleb"+(level-1).toString()+(k).toString());
            chooseele.style.backgroundColor="green";
            await new Promise(resolve => setTimeout(resolve, time_interval));
            parentele.style.backgroundColor="red";
            parentele.innerText=rarr[j].toString();
            await new Promise(resolve => setTimeout(resolve, time_interval));
            chooseele.style.backgroundColor=original_color;
            parentele.style.backgroundColor=original_color;


            tarr[k]=rarr[j];
            j++;
        }
        k++;
    }
    while(i<n1){
        var chooseele=document.getElementById("eleb"+level.toString()+(l+i).toString());
            var parentele=document.getElementById("eleb"+(level-1).toString()+(k).toString());
            chooseele.style.backgroundColor="green";
            await new Promise(resolve => setTimeout(resolve, time_interval));
            parentele.style.backgroundColor="red";
            parentele.innerText=larr[i].toString();
            await new Promise(resolve => setTimeout(resolve, time_interval));
            chooseele.style.backgroundColor=original_color;
            parentele.style.backgroundColor=original_color;

        tarr[k]=larr[i];
        i++;k++;
    }
    while(j<n2){
        var chooseele=document.getElementById("eleb"+level.toString()+(m+1+j).toString());
            var parentele=document.getElementById("eleb"+(level-1).toString()+(k).toString());
            chooseele.style.backgroundColor="green";
            await new Promise(resolve => setTimeout(resolve, time_interval));
            parentele.style.backgroundColor="red";
            parentele.innerText=rarr[j].toString();
            await new Promise(resolve => setTimeout(resolve, time_interval));
            chooseele.style.backgroundColor=original_color;
            parentele.style.backgroundColor=original_color;

        tarr[k]=rarr[j];
        j++;k++;
    }
    //after merge destroy lower level
    document.getElementById("lb"+(level).toString()+(box).toString()).style.visibility="hidden";
    document.getElementById("lb"+(level).toString()+(box+1).toString()).style.visibility="hidden";
    notice.innerText="after marge childs destroied";
    await new Promise(resolve => setTimeout(resolve, time_interval));
}

/*quick sort----------------------------------------------------------------------------------------------------------------*/
/*quick sort----------------------------------------------------------------------------------------------------------------*/



async function quickSort(tarr)
{
    var l=0;
    var r=tarr.length;
    

    var n=r-l;
 
    var c=0;
    //console.log(l,r,n,level);
    var lboxhtml="";
    while(c<=n)
    {
        lboxhtml+="<div class='levelbox' style='width:100%;' id=l"+c.toString()+"></div>";
        c++;
    }
    lboxhtml+="";
    showArrayBars.innerHTML=lboxhtml;
    
   
    await recQuickSort(tarr,l,r-1,0,0);
    notice.innerText="Sorted Array";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    notice.innerText="";
    notice.style.visibility="hidden";
    set.disabled=false;
}

async function recQuickSort(tarr,l,r,level,box)
{
    await new Promise(resolve => setTimeout(resolve, time_interval));
    if(l<=r){
        var n=tarr.length;
        var w=90/((n));
        var marginleft=0;
        var eleboxhtml="";

        for(var i=l;i<=r;i++)
        {
            if(i==l){
                marginleft=w*l;
            }else{
                marginleft=0;
            }
            eleboxhtml+="<div class='recarrbox' id='eleb"+level.toString()+i.toString()+"' style='margin-left:"+marginleft+"%; background-color:"+original_color+";width:"+w+"%;'>"+tarr[i]+"</div>";
        }

        targetlbox=document.getElementById("l"+level.toString());
        targetlbox.innerHTML=eleboxhtml;
        targetlbox.style.visibility="visible";
    }
        

    if(l<r){
        
        level++;
        var p=await partition(tarr,l,r,level,box);
        
        notice.innerText="First Part";
        await recQuickSort(tarr,l,p-1,level,2*box);
        notice.innerText="2nd Part";
        await recQuickSort(tarr,p+1,r,level,2*box+1);
        
        await removePartation(tarr,level,l,r);
    }
}
async function removePartation(tarr,level,l,r)
{
    notice.innerText="control back to parent";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    rbox=document.getElementById("l"+(level).toString());
    rbox.innerHTML="";
        var n=tarr.length;
        var w=90/((n));
        var marginleft=0;
        var eleboxhtml="";
        for(var i=l;i<=r;i++)
        {
            if(i==l){
                marginleft=w*l;
            }else{
                marginleft=0;
            }
            eleboxhtml+="<div class='recarrbox' id='eleb"+level.toString()+i.toString()+"' style='margin-left:"+marginleft+"%; background-color:"+original_color+";width:"+w+"%;'>"+tarr[i]+"</div>";
        }

        targetlbox=document.getElementById("l"+(level-1).toString());
        notice.innerText="after sort this portion becames";
        await new Promise(resolve => setTimeout(resolve, time_interval));
        targetlbox.innerHTML=eleboxhtml;
}
async function  partition(tarr,l,r,level,box)
{
    await new Promise(resolve => setTimeout(resolve, time_interval));
    var pivotele=document.getElementById("eleb"+(level-1).toString()+r.toString());
    notice.innerText="pivot = "+tarr[r];
    pivotele.style.background="red";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    notice.innerText="now set smaller elements in left and grater elements in right";
    await new Promise(resolve => setTimeout(resolve, time_interval));
    
    var pivot=tarr[r];
    var i=(l-1);

    
    await new Promise(resolve => setTimeout(resolve, time_interval));

    for(var j=l;j<=r-1;j++)
    {
        //var iele=document.getElementById("eleb"+(level-1).toString()+(i+1).toString());
        var iele=document.getElementById("eleb"+(level-1).toString()+(i+1).toString());
        iele.style.background=hold_color;
        var jele=document.getElementById("eleb"+(level-1).toString()+j.toString());
        await new Promise(resolve => setTimeout(resolve, time_interval));
        jele.style.background=choose_color;
        await new Promise(resolve => setTimeout(resolve, time_interval));
        
        if(tarr[j]<pivot)
        {
            notice.innerText="This ele is less than pivot";
            await new Promise(resolve => setTimeout(resolve, time_interval));
            notice.innerText="we have to swap it with selected element";
            await new Promise(resolve => setTimeout(resolve, time_interval));
            iele.style.background=swap_color;
            jele.style.background=swap_color;
            await new Promise(resolve => setTimeout(resolve, time_interval));
            i++;
            var t=tarr[i];
            tarr[i]=tarr[j];
            tarr[j]=t;
            iele.innerText=tarr[i];
            jele.innerText=tarr[j];
            iele.style.backgroundColor=original_color;
        }
        
        jele.style.backgroundColor=original_color;
        //if(i==l&&tarr[j]>=pivot) iele.style.background=hold_color;
        
        
    }
    iele.style.backgroundColor=original_color;
    notice.innerText="swap pivot with original position";
    
    var ls1=document.getElementById("eleb"+(level-1).toString()+(i+1).toString());
    var ls2=document.getElementById("eleb"+(level-1).toString()+(r).toString());
    ls1.style.backgroundColor=swap_color;
    ls1.style.backgroundColor=swap_color;
    await new Promise(resolve => setTimeout(resolve, time_interval));
    var t=tarr[i+1];
    tarr[i+1]=tarr[r];
    tarr[r]=t;
    ls1.innerText=tarr[i+1];
    ls2.innerText=tarr[r];
    await new Promise(resolve => setTimeout(resolve, time_interval));
    ls1.style.backgroundColor=original_color;
    ls2.style.backgroundColor=original_color;

    return ++i;
}