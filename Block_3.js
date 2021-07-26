let allTask = [];

let valInput = ''
let input = null;

let valInputDone = '';
let inputDone = null;

window.onload = init = async () => {
  input = document.getElementById('input-id');
  input.addEventListener('change', updateValue);

  const response1 = await fetch('http://localhost:7000/getData', {
    method: 'GET'
  });
  let result1 = await response1.json();
  allTask = result1.data;

  render(-1);
}

const updateValue = (event) => {
  valInput = event.target.value;
}

const onChangeCheckBox = async (index) => {
  const checkChange = !allTask[index].isCheck;
  const response6 = await fetch('http://localhost:7000/updateOne', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allaw-Origin': '*'
    },
    body: JSON.stringify({
      _id: allTask[index]._id,
      isCheck: checkChange
    })
  });

  render(-1);
}

const onClockDeleteAll = async () => {
  let response5;

  response5 = await fetch('http://localhost:7000/deleteAll', {
    method: 'DELETE'
  });

  render(-1);
}

const onClockButton = async () => {
  if (!valInput) {
    alert('Введите задачу!');
  } else {
    const response2 = await fetch('http://localhost:7000/createNewTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        text: valInput,
        isCheck: false
      })
    });
  
    valInput = '';
    input.value = '';
  
    render(-1);
  }
}

const onClickEdit = (index) => {
  render(index);
}

const onClickDelete = async (index) => {
  const response3 = await fetch(`http://localhost:7000/deleteOne?_id=${allTask[index]._id}`, {
    method: 'DELETE'
  });

  render(-1);
}

const onClickDone = async (index) => {
  inputDone = document.getElementById('input-done-id');

  if (inputDone.value === '') {
    alert('Введите задачу!');
  } else {
    const response7 = await fetch('http://localhost:7000/updateOne', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        _id: allTask[index]._id,
        text: inputDone.value,
      })
    });

    render(-1);
  }
}

const onClickCancel = () => {
  render(-1);
}

const render = async (indInput) => {

  const response4 = await fetch('http://localhost:7000/getData', {
    method: 'GET'
  });
  let result4 = await response4.json();
  allTask = result4.data;

  allTask.sort((element1, element2) => {
    return element1.isCheck - element2.isCheck;
  });

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
      checkBox.onchange = () => {
        onChangeCheckBox(index);
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