let allTask = JSON.parse(localStorage.getItem('tasks')) || [];
// sessionStorage

let valInput = ''
let input = null;

let valInputDone = '';
let inputDone = null;

window.onload = init = () => {
  input = document.getElementById('input-id');
  input.addEventListener('change', updateValue);
  render(-1);
}

// const pressEnter = (event) => {
//   if (event.keyCode === 13) {
//     if (!valInput) {
//       alert('Введите задачу!');
//     } else {
//       allTask.push({
//         text: valInput,
//         isCheck: false
//       });
    
//       valInput = '';
//       input.value = '';
    
//       render(-1);
//     }
//   }
// }

const updateValue = (event) => {
  valInput = event.target.value;
}

const onChangeCheckBox = (index, checkBox) => {
  allTask[index].isCheck = !allTask[index].isCheck;

  if (checkBox.checked) {
    allTask.sort((element1, element2) => {
      return element1.isCheck - element2.isCheck;
    });
  } else {
    allTask.sort((element1, element2) => {
      return element1.isCheck - element2.isCheck;
    });
  }

  localStorage.setItem('tasks', JSON.stringify(allTask));

  render(-1);
}

const onClockDeleteAll = () => {
  localStorage.removeItem('tasks');

  allTask.splice(0, allTask.length);

  render(-1);
}

const onClockButton = () => {
  if (!valInput) {
    alert('Введите задачу!');
  } else {
    allTask.push({
      text: valInput,
      isCheck: false
    });

    localStorage.setItem('tasks', JSON.stringify(allTask));
  
    valInput = '';
    input.value = '';
  
    render(-1);
  }
}

const onClickEdit = (index) => {
  render(index);
}

const onClickDelete = (index) => {
  allTask.splice(index, 1);

  localStorage.setItem('tasks', JSON.stringify(allTask));

  render(-1);
}

const onClickDone = (index) => {
  inputDone = document.getElementById('input-done-id');

  if (inputDone.value === '') {
    alert('Введите задачу!');
  } else {
    allTask[index] = {
      text: inputDone.value,
      isCheck: false
    };

    localStorage.setItem('tasks', JSON.stringify(allTask));
  
    render(-1);
  }
}

const onClickCancel = () => {
  render(-1);
}

const render = (indInput) => {

  const list = document.getElementsByClassName('to-go-list')[0];

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  allTask.forEach((element, index) => {
    const task = document.createElement('div');
    task.className = 'task';
    task.id = `task-${index}`;

    let text = '';
    let done = '';
    let imageDone = '';
    let cancel = '';
    let imageCancel = '';

    let checkBox = '';
    let edit = '';
    let imageEdit = '';
    let delet = '';
    let imageDelet = '';

    if (indInput === index) {
      text = document.createElement('input');
      text.type = 'text';
      text.className = 'edit-input';
      text.id = 'input-done-id';
      text.value = allTask[index].text;

      done = document.createElement('div');
      done.className = 'div-for-img';
      done.onclick = () => {
        onClickDone(index);
      };
      imageDone = document.createElement('img');
      imageDone.src = 'Images/tick.png';
      done.appendChild(imageDone);

      cancel = document.createElement('div');
      cancel.className = 'div-for-img';
      cancel.onclick = () => {
        onClickCancel();
      };
      imageCancel = document.createElement('img');
      imageCancel.src = 'Images/close.png';
      cancel.appendChild(imageCancel);

      task.appendChild(text);
      task.appendChild(done);
      task.appendChild(cancel);

      list.appendChild(task);

    } else {
      checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.className = 'checkBox';
      checkBox.checked = element.isCheck;
      localStorage.setItem('tasks', JSON.stringify(allTask));
      checkBox.onchange = () => {
        onChangeCheckBox(index, checkBox);
      };

      text = document.createElement('p');
      text.innerText = element.text;
      text.className = checkBox.checked ? 'p-normal p-done' : 'p-normal';
      
      edit = document.createElement('div');
      edit.className = 'div-for-img';
      edit.onclick = () => {
        onClickEdit(index);
      };
      imageEdit = document.createElement('img');
      imageEdit.src = 'Images/pencil.png';
      edit.appendChild(imageEdit);

      delet = document.createElement('div');
      delet.className = 'div-for-img';
      delet.onclick = () => {
        onClickDelete(index);
      };
      imageDelet = document.createElement('img');
      imageDelet.src = 'Images/close.png';
      delet.appendChild(imageDelet);

      task.appendChild(text);
      task.appendChild(checkBox);
      if (!checkBox.checked) task.appendChild(edit);
      task.appendChild(delet);

      list.appendChild(task);
    }
  });
}