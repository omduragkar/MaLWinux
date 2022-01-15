(function main(){

    let folders=[];
    let files=[];
    let fid = 0;
    let pid = 0;
    let maindiv = document.querySelector("#foldercontainer");
    let btnfolder = document.querySelector("#addbtn");
    let btnfile = document.querySelector("#addbtnfile");
    let template = document.querySelector("#mytemplate");

    let breadcrumbs = template.content.querySelector(".breadcrumbname");
    
    function viewclick(){
        let th = this.parentNode;
        let thi = th.querySelector(".fname").innerHTML;
        pid = parseInt(th.getAttribute("fid"));
        console.log(pid);

        let breadcrumbscopy = document.importNode(breadcrumbs, true);
        breadcrumbscopy.querySelector(".breadcrumstop").innerHTML = thi;
        document.querySelector("#divusage2").appendChild(breadcrumbscopy);
        breadcrumbscopy.querySelector(".breadcrumstop").setAttribute("fid", fid);
        breadcrumbscopy.addEventListener('click', chan);
        let x = folders.filter(f=>f.pid == pid);
        if(x == 0){
            maindiv.innerHTML ="";
        }
        else{
            
            maindiv.innerHTML ="";
            x.forEach(f=>{
                folderinpage(f.name, f.fid, f.pid);
            })
        }
        
    }
    function addfolderclick(){
        let folderName = prompt("Enter Name of the folder: ");
        if(!folderName){
            alert('Please Enter a valid name')
            return;
        }
        else{
            let foldersd = folders.findIndex(v=> v.name == folderName);
            // console.log(foldersd);
            if(foldersd>=0){
                alert(`${folderName} Already exixts`);
                return;
            }else{
                fid++;
                folderinpage(folderName, fid, pid);
                addtols();
            }
        }
        
    }
    
    btnfolder.addEventListener('click', addfolderclick);
    
    function delclick(){
        // console.log(fid);
        console.log("delclick called");
        let clickedDiv = this.parentNode;
        if(confirm(`Sure you wanna delete  ${clickedDiv.querySelector(".fname").innerHTML}`))
        {
            maindiv.removeChild(clickedDiv);
            folders = folders
            .filter(v=>{
                if(v.fid == parseInt(clickedDiv.getAttribute("fid"))){
                    
                    return false;
                }
                else{
                    return true;
                }
            }
            );
            addtols();
        }
    }
    function editclick(){
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector(".fname");
        
        let fname = prompt("Enter the new folder name");
        if(!fname){
            return;
        }
        
        divName.innerHTML = fname;
        
        let folder = folders.find(f => f.fid == parseInt(divFolder.getAttribute("fid")));
        folder.name = fname;
        addtols();
    }
    
    function folderinpage(fname, fid, cpid)
    {
        // console.log(fname, fid, cpid);
        let m = folders.find(v=> v.fid == fid);
        if(m!= -1){
            folders.push({"name":fname, "fid":fid, "pid":cpid});
        }
        let foldercopy = template.content.querySelector(".folder");
        let origfolder = document.importNode(foldercopy, true);
        let filenamer = origfolder.querySelector(".fname");
        filenamer.innerHTML = fname;
        maindiv.appendChild(origfolder);
        origfolder.setAttribute("fid", fid);
        let delspan = origfolder.querySelector("span[action='delete']");
        delspan.addEventListener('click', delclick);
        
        let editspan = origfolder.querySelector("span[action='edit']");
        editspan.addEventListener('click', editclick);
        
        let viewspan = origfolder.querySelector("span[action='view']");
        viewspan.addEventListener('click', viewclick);
    }
    function chan(){
        let gettingd = this.querySelector(".breadcrumstop");
        console.log(gettingd);
        let poid = parseInt(gettingd.getAttribute("fid"));
        if(poid == pid){
            return;
        }
        else{
            pid = poid;
            console.log(pid);
            maindiv.innerHTML="";
            let x = folders.filter(v=>{
                if(v.pid == pid){
                    folderinpage(v.name, v.fid, v.pid);
                }
            })
            console.log(x);
        }
    }
    function addfolderinstart(){
        let breadcrumbscopy = document.importNode(breadcrumbs, true);
        breadcrumbscopy.querySelector(".breadcrumstop").innerHTML = "Home";
        breadcrumbscopy.querySelector(".breadcrumstop").setAttribute("fid", 0);
        document.querySelector("#divusage2").appendChild(breadcrumbscopy);
        breadcrumbscopy.addEventListener('click', chan);
        pid = 0;
        let x  = retrievefromls();
        
        if(x!=null)
        { 
            // console.log(x);
            folders = x.map(v=>{
                if(v.pid == pid){
                    folderinpage(v.name, v.fid, v.pid);
                }
                return v;
            });
            fid = folders[folders.length - 1].fid
        }
    }
    
    
    
    function retrievefromls(){
        let fjson = localStorage.getItem("folders");
        let  y = JSON.parse(fjson);
        return y;
        
    }
    
    function addtols(){
        let x = JSON.stringify(folders);
        localStorage.setItem("folders", x);
    }
    addfolderinstart();
})();