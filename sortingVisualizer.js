const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 910;
const SCREEN_HEIGHT = 750;
const arrSize = 130;
const rectSize = 7;
let arr = [];
let complete = false;

function randomizeArray() {
  arr = Array.from({ length: arrSize }, () =>
    Math.floor(Math.random() * SCREEN_HEIGHT)
  );
  complete = false;
  visualize();
}

function visualize(x = -1, y = -1, z = -1) {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  arr.forEach((height, index) => {
    ctx.fillStyle = complete
      ? "rgb(100, 180, 100)"
      : index === x || index === z
      ? "rgb(100, 180, 100)"
      : index === y
      ? "rgb(165, 105, 189)"
      : "#31363F";
    ctx.fillRect(index * rectSize, SCREEN_HEIGHT - height, rectSize, height);
  });
}

async function selectionSort() {
  for (let i = 0; i < arrSize - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arrSize; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        visualize(i, minIndex);
        await new Promise((r) => setTimeout(r, 1));
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  complete = true;
  visualize();
}

async function insertionSort() {
  for (let i = 1; i < arrSize; i++) {
    let j = i - 1;
    let temp = arr[i];
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
      visualize(i, j + 1);
      await new Promise((r) => setTimeout(r, 5));
    }
    arr[j + 1] = temp;
  }
  complete = true;
  visualize();
}

async function bubbleSort() {
  for (let i = 0; i < arrSize - 1; i++) {
    for (let j = 0; j < arrSize - 1 - i; j++) {
      if (arr[j + 1] < arr[j]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        visualize(j + 1, j, arrSize - i);
      }
      await new Promise((r) => setTimeout(r, 1));
    }
  }
  complete = true;
  visualize();
}

async function mergeSort(arr, si, ei) {
  if (si >= ei) return;
  let mid = Math.floor((si + ei) / 2);
  await mergeSort(arr, si, mid);
  await mergeSort(arr, mid + 1, ei);
  await merge(arr, si, mid, ei);
}

async function merge(arr, si, mid, ei) {
  let tempArr = [];
  let i = si,
    j = mid + 1;
  while (i <= mid && j <= ei) {
    if (arr[i] <= arr[j]) {
      tempArr.push(arr[i++]);
    } else {
      tempArr.push(arr[j++]);
    }
  }
  while (i <= mid) tempArr.push(arr[i++]);
  while (j <= ei) tempArr.push(arr[j++]);
  for (let k = si; k <= ei; k++) {
    arr[k] = tempArr[k - si];
    visualize(k);
    await new Promise((r) => setTimeout(r, 15));
  }
}

function mergeSortWrapper() {
  mergeSort(arr, 0, arrSize - 1).then(() => {
    complete = true;
    visualize();
  });
}

async function quickSort(arr, si, ei) {
  if (si >= ei) return;
  let c = await partition(arr, si, ei);
  await quickSort(arr, si, c - 1);
  await quickSort(arr, c + 1, ei);
}

async function partition(arr, si, ei) {
  let pivot = arr[si];
  let count = 0;
  for (let i = si + 1; i <= ei; i++) {
    if (arr[i] <= pivot) count++;
  }
  let c = si + count;
  [arr[si], arr[c]] = [arr[c], arr[si]];
  visualize(c, si);
  await new Promise((r) => setTimeout(r, 70));
  let i = si,
    j = ei;
  while (i < c && j > c) {
    if (arr[i] <= arr[c]) i++;
    else if (arr[j] > arr[c]) j--;
    else {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      visualize(i, j);
      await new Promise((r) => setTimeout(r, 70));
      i++;
      j--;
    }
  }
  return c;
}

function quickSortWrapper() {
  quickSort(arr, 0, arrSize - 1).then(() => {
    complete = true;
    visualize();
  });
}

async function heapSort() {
  for (let i = 1; i < arrSize; i++) {
    let childIndex = i;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    while (childIndex > 0 && arr[childIndex] > arr[parentIndex]) {
      [arr[childIndex], arr[parentIndex]] = [arr[parentIndex], arr[childIndex]];
      visualize(parentIndex, childIndex);
      await new Promise((r) => setTimeout(r, 40));
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }
  for (let heapLast = arrSize - 1; heapLast > 0; heapLast--) {
    [arr[0], arr[heapLast]] = [arr[heapLast], arr[0]];
    let parentIndex = 0;
    let leftChildIndex = 2 * parentIndex + 1;
    let rightChildIndex = 2 * parentIndex + 2;
    while (leftChildIndex < heapLast) {
      let maxIndex = parentIndex;
      if (arr[leftChildIndex] > arr[maxIndex]) maxIndex = leftChildIndex;
      if (rightChildIndex < heapLast && arr[rightChildIndex] > arr[maxIndex])
        maxIndex = rightChildIndex;
      if (maxIndex === parentIndex) break;
      [arr[parentIndex], arr[maxIndex]] = [arr[maxIndex], arr[parentIndex]];
      visualize(maxIndex, parentIndex, heapLast);
      await new Promise((r) => setTimeout(r, 40));
      parentIndex = maxIndex;
      leftChildIndex = 2 * parentIndex + 1;
      rightChildIndex = 2 * parentIndex + 2;
    }
  }
  complete = true;
  visualize();
}

randomizeArray();
