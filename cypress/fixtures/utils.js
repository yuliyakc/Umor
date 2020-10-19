function getRandomNum(max_value) {
    let res = Math.floor(Math.random() * Math.floor(max_value));
    return res == 0? 1 : res;
  }