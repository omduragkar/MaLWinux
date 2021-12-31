(function main(){

    let folders=[];
    let fid = 0;
    let maindiv = document.querySelector("#maindiv");
    let btnfolder = document.querySelector("#addbtn");
    let template = document.querySelector("#mytemplate");
    
    function addfolderclick(){
        let folderName = prompt("Enter Name of the folder: ");
        if(!folderName){
            return;
        }
        fid++;
        folderinpage(folderName, fid);
        // console.log(folders);
        addtols();
        
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

    function folderinpage(fname, fid)
    {
        let foldercopy = template.content.querySelector(".folder");
        let origfolder = document.importNode(foldercopy, true);
        origfolder.setAttribute("fid", fid);
        let filenamer = origfolder.querySelector(".fname");
        filenamer.innerHTML = fname;
        folders.push({"name":fname, "fid":fid});
        maindiv.appendChild(origfolder);
        let delspan = origfolder.querySelector("span[action='delete']");
        delspan.addEventListener('click', delclick);
        let editspan = origfolder.querySelector("span[action='edit']");
        
        editspan.addEventListener('click', editclick);
    }

    function addfolderinstart(){
        let x  = retrievefromls();
        if(x!=null)
        { 
            // console.log(x);
            folders = x.map(v=>{
                // console.log(v);
                folderinpage(v.name, v.fid);
                return v;
            });
            // console.log(folders);
            // console.log(fid);
            fid = folders[folders.length - 1].fid
            // console.log(fid);        
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