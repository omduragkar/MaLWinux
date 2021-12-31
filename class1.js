// let btn = document.querySelector("#addbtn");
// let maindiv = document.querySelector("#maindiv");
// let folders=[];
// let fid = 0;


// function addFolder(){
//     let fname = prompt("FoldersName");
//     if(!fname){
//         return;
//     }
//     let foldercop = document
//     .querySelector("#mytemplate");
//     let origfolder = foldercop.content
//     .querySelector(".folder");
//     let finalfolder = document
//         .importNode(origfolder, true);
//     finalfolder.setAttribute("fid", ++fid);
//     finalfolder
//         .querySelector(".fname").innerHTML = fname; 
//     maindiv.appendChild(finalfolder);   
//     folders.push({id:fid, name:fname});
//     addtolstorage();
//     let del = finalfolder.querySelector("span[action='delete']");
//     let edit = finalfolder.querySelector("span[action='edit']");
//     // console.log(del)
//     del.addEventListener("click", function(){
//         if(confirm(`Do you want to Delete ${fname}`)){
//             maindiv.removeChild(finalfolder);   
            
//         }
//         let x = finalfolder.getAttribute("fid");
//         console.log(x);
//         folders = folders.filter(v=>{
//             if(v.id == x){
//                 return false;
//             }
//             else{
//                 return true;
//             }
            
//         })
//         addtolstorage();
//         // console.log(folders);
//     })

//     edit.addEventListener('click', function(){
            
//         let x = prompt("Enter New Name:  ");
//         if(!x){
//             return;
//         }
//         else{
//             finalfolder
//             .querySelector(".fname").innerHTML = x;
//         }
//     }) 
// }
// function addFolderwithgivenname(fname, fid){
//     if(!fname){
//         return;
//     }
//     let foldercop = document
//     .querySelector("#mytemplate");
//     let origfolder = foldercop.content
//     .querySelector(".folder");
//     let finalfolder = document
//         .importNode(origfolder, true);
//     finalfolder.setAttribute("fid", fid);
//     finalfolder
//         .querySelector(".fname").innerHTML = fname; 
//     maindiv.appendChild(finalfolder);   
//     folders.push({id:fid, name:fname});
//     addtolstorage();
//     let del = finalfolder.querySelector("span[action='delete']");
//     let edit = finalfolder.querySelector("span[action='edit']");
//     // console.log(del)
//     del.addEventListener("click", function(){
//         delfold(fid);
//     })

//     edit.addEventListener('click', function(fid){
//           editfolder(fid)        
//     }) 
// }
// function delfold(fid){
//     let i = folders.findIndex(v=>v.id == fid);
//     if(confirm(`Do you want to Delete ${folders[i].name}`)){
//         maindiv.removeChild(finalfolder);   
        
//     }
//     folders = folders.filter(v=>{
//         if(v.id == i){
//             return false;
//         }
//         else{
//             return true;
//         }
        
//     })
//     addtolstorage();
// }
// function editfolder(fid){
//     let i = folders.findIndex(v=>v.id == fid);
//     let x = prompt("Enter New Name:  ");
//     if(!x){
//         return;
//     }
//     else{
//         folders[i].name = x;
//         addtolstorage();
//     }
// }
// btn.addEventListener("click", addFolder)

// let btnfile = document.querySelector("#addbtnfile");

// btnfile.addEventListener("click", function(){
//     let fname = prompt("File name");
//     if(!fname){
//         return;
//     }
//     let foldercop = document
//     .querySelector("#mytemplate");
//     let origfolder = foldercop.content
//     .querySelector(".file");
//     let finalfolder = document
//         .importNode(origfolder, true);
//     finalfolder.setAttribute("fid", ++fid);
//     finalfolder
//         .querySelector(".fname").innerHTML = fname;
//     maindiv.appendChild(finalfolder);   
//     let del = finalfolder.querySelector("span[action='delete']");
//     console.log(del)
//     del.addEventListener("click", function(){
//         if(confirm(`Do you want to Delete ${fname}`)){
//             maindiv.removeChild(finalfolder);   
            
//         }
//     })
    
// })

// function addtolstorage(){
//     localStorage.setItem("folders", JSON.stringify(folders));
// }
// function addearlier(){
//     let earlier = localStorage.getItem("folders");
//     let y = JSON.parse(earlier);
//     folders = folders.concat(y);
// }
// addearlier();
// // console.log(folders)
// folders.forEach(function (v){
//     addFolderwithgivenname(v.name, v.id);
// })

// console.log(folders);









// (function(){
//     let btnAddFolder = document.querySelector("#btnAddFolder");
//     let divContainer = document.querySelector("#divContainer");
//     let pageTemplates = document.querySelector("#pageTemplates");
//     let fid = 0;
//     let folders = [];

//     btnAddFolder.addEventListener("click", addFolder);

//     function addFolder(){
//         let fname = prompt("Folder name?");
//         if(!fname){
//             return;
//         }

//         fid++;
//         addFolderInPage(fname, fid);

//         folders.push({
//             id: fid,
//             name: fname
//         });
//         persistFoldersToStorage();
//     }

//     function deleteFolder(){
//         let divFolder = this.parentNode;
//         let divName = divFolder.querySelector("[purpose='name']");

//         let flag = confirm("Do you want to delete the folder " + divName.innerHTML);
//         if(flag == true){
//             divContainer.removeChild(divFolder);
            
//             let idx = folders.findIndex(f => f.id == parseInt(divFolder.getAttribute("fid")));
//             folders.splice(idx, 1);
//             persistFoldersToStorage();
//         }
//     }

//     function editFolder(){
//         let divFolder = this.parentNode;
//         let divName = divFolder.querySelector("[purpose='name']");

//         let fname = prompt("Enter the new folder name");
//         if(!fname){
//             return;
//         }

//         divName.innerHTML = fname;

//         let folder = folders.find(f => f.id == parseInt(divFolder.getAttribute("fid")));
//         folder.name = fname;
//         persistFoldersToStorage();
//     }

//     function addFolderInPage(fname, fid){
//         let divFolderTemplate = pageTemplates.content.querySelector(".folder");
//         let divFolder = document.importNode(divFolderTemplate, true);

//         let divName = divFolder.querySelector("[purpose='name']");
//         divName.innerHTML = fname;
//         divFolder.setAttribute("fid", fid);

//         let spanDelete = divFolder.querySelector("span[action='delete']");
//         spanDelete.addEventListener("click", deleteFolder);

//         let spanEdit = divFolder.querySelector("span[action='edit']");
//         spanEdit.addEventListener("click", editFolder);

//         divContainer.appendChild(divFolder);
//     }

//     function persistFoldersToStorage(){
//         console.log(folders);
//         let fjson = JSON.stringify(folders);
//         localStorage.setItem("data", fjson);
//     }

//     function loadFoldersFromStorage(){
//         let fjson = localStorage.getItem("data");
//         if(!!fjson){
//             folders = JSON.parse(fjson);
//             folders.forEach(function(f){
//                 addFolderInPage(f.name, f.id);
//             })
//         }
//     }

//     loadFoldersFromStorage();
// })();