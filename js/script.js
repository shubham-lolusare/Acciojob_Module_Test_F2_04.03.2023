const newPost = document.querySelector("#newPostBtn");
const createModal = document.querySelector(".createModal");
const editModal = document.querySelector(".editModal");
const myForm = document.querySelector("#postForm");
const dpChild = document.querySelector(".dynamicPart");

let idNum = 0;

// -------------------------------------------------------------------------------------------------------------
// When the user click on Create New Post this function will run
newPost.onclick = () => {
  const close = document.querySelector(".createModalHeading #closeModal");
  const cancelPost = document.querySelector("#cnclPst");
  const publishPost = document.querySelector("#pblshPost");

  createModal.style.display = "block";

  cancelPost.onclick = () => {
    myForm.reset();
    createModal.style.display = "none";
  };

  close.addEventListener("click", () => {
    myForm.reset();
    createModal.style.display = "none";
  });
};

// -------------------------------------------------------------------------------------------------------------
/*  
  Function that will layout the post dynamically.
  Inbuilt css classes are also added dynamically.
  For better understanding please refer the HTML dynamicPart div
  where the template div is provided for the blog posts that is implemented below.
*/
function post_content(event) {
  idNum++;
  event.preventDefault();
  createModal.style.display = "none";

  const post_heading = document.querySelector("#createPostHeading");
  const post_content = document.querySelector("#createPostContent");

  // -------------------------------------------------------------------------------------------------------------
  const post_div = document.createElement("div");
  post_div.setAttribute("class", "post");
  post_div.setAttribute("id", `${idNum}`);

  // -------------------------------------------------------------------------------------------------------------
  const heading_div = document.createElement("div");
  heading_div.setAttribute("class", "headingStyle");
  const headingTextNode = document.createTextNode(post_heading.value);
  heading_div.appendChild(headingTextNode);
  post_div.appendChild(heading_div);

  // -------------------------------------------------------------------------------------------------------------
  const text_div = document.createElement("div");
  text_div.setAttribute("class", "textStyle");
  const contentTextNode = document.createTextNode(post_content.value);
  text_div.appendChild(contentTextNode);
  post_div.appendChild(text_div);

  // -------------------------------------------------------------------------------------------------------------
  const post_control_div = document.createElement("div");
  post_control_div.setAttribute("class", "postControls");

  // -------------------------------------------------------------------------------------------------------------
  const edit_post_btn_div = document.createElement("div");
  const edit_post_btn = document.createElement("input");
  edit_post_btn.setAttribute("type", "button");
  edit_post_btn.setAttribute("class", "postBtnStyle");
  edit_post_btn.setAttribute("value", "Edit Post");
  edit_post_btn.setAttribute("id", `edit${idNum}`);
  edit_post_btn_div.appendChild(edit_post_btn);
  post_control_div.appendChild(edit_post_btn_div);

  // -------------------------------------------------------------------------------------------------------------
  const remove_post_btn_div = document.createElement("div");
  remove_post_btn_div.setAttribute("class", "removeButton");
  const remove_post_btn = document.createElement("input");
  remove_post_btn.setAttribute("type", "button");
  remove_post_btn.setAttribute("class", "postBtnStyle");
  remove_post_btn.setAttribute("value", "Delete Post");
  remove_post_btn.setAttribute("id", `del${idNum}`);
  remove_post_btn_div.appendChild(remove_post_btn);
  post_control_div.appendChild(remove_post_btn_div);

  // -------------------------------------------------------------------------------------------------------------
  const post_detail_div = document.createElement("div");
  post_detail_div.setAttribute("class", "postDetailsStyle");
  const post_detail_text_node = document.createTextNode(
    `Created At : ${getdate()} at ${gettime()}`
  );
  post_detail_div.appendChild(post_detail_text_node);
  post_control_div.appendChild(post_detail_div);
  post_div.appendChild(post_control_div);

  dpChild.appendChild(post_div);
  myForm.reset();

  // -------------------------------------------------------------------------------------------------------------
  const editPost = document.getElementById(`edit${idNum}`);
  editPost.addEventListener("click", edit_post);

  const delPost = document.getElementById(`del${idNum}`);
  delPost.addEventListener("click", delete_post);
}

// Function to edit the created post
function edit_post(event) {
  // Creating the event listeners for edit modal
  const close = document.querySelector(".editModalHeading #closeModal");
  const deletePost = document.querySelector("#delPost");
  const savePost = document.querySelector("#savePost");

  editModal.style.display = "block";

  close.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  const post_id = event.target.id.substring(4);
  const post_div = document.getElementById(`${post_id}`);

  document.querySelector("#postHeading").value =
    post_div.childNodes[0].textContent;

  document.querySelector("#postContent").value =
    post_div.childNodes[1].textContent;

  savePost.onclick = (event) => {
    event.preventDefault();
    editModal.style.display = "none";
    saveFunction(post_id);
  };

  deletePost.onclick = (event) => {
    event.preventDefault();
    editModal.style.display = "none";
    deleteFunction(post_id);
  };
}

// -------------------------------------------------------------------------------------------------------------
// function to save the changes from edit modal
function saveFunction(id) {
  const post_div = document.getElementById(`${id}`);
  post_div.childNodes[0].textContent =
    document.querySelector("#postHeading").value;
  post_div.childNodes[1].textContent =
    document.querySelector("#postContent").value;
  post_div.childNodes[2].childNodes[2].textContent = `Last Updated At : ${getdate()} at ${gettime()}`;
}

// -------------------------------------------------------------------------------------------------------------
//function to delete the post from edit modal
function deleteFunction(id) {
  const post_div = document.getElementById(`${id}`);
  dpChild.removeChild(post_div);
}

// -------------------------------------------------------------------------------------------------------------
// Function to delete the post from UI
function delete_post(event) {
  const post_id = event.target.id.substring(3);
  const del_element = document.getElementById(`${post_id}`);
  dpChild.removeChild(del_element);
}

// -------------------------------------------------------------------------------------------------------------
// Function to get the date in dd/mm/yyyy format
function getdate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
}

// -------------------------------------------------------------------------------------------------------------
// Function to get the time in hh:mm am/pm format
function gettime() {
  const time = new Date();
  const hr = time.getHours();
  const min =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  const amorpm = hr >= 12 ? "PM" : "AM";
  const format12 = hr > 12 ? hr - 12 : hr;
  const addZer = format12 < 10 ? `0${format12}` : format12;
  const timeStr = `${addZer}:${min} ${amorpm}`;
  return timeStr;
}
