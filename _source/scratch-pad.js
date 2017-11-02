function getData() {
  return fetch("http://newfinds.com", { method: "POST" }).then(response => {
    return response.json();
  });
  // .catch(err => {
  //   console.log("caught the error", err);
  // });
}

// using the function
getData()
  .then(response => {
    console.log("response", response);
  })
  .catch(err => {
    console.log(err, "caught the error");
  });

async function getData() {
  const result = await fetch("http://newfinds.com", { method: "POST" });
  return await response.json();
}

async function doThing() {
  await someAsyncThing();
  return "I did the thing";
}

doThing().then(result => console.log(result));
// I did the thing

// traditional function
async function functionName() {
  return await something();
}

// function as a parameter
doThing(async () => {
  return await something();
});

// function defined as const
const functionName = async () => {
  return await soemthing();
};

/////
function rejects() {
  return Promise.reject("Kaboom");
}

async function getData() {
  return await rejects().catch(err => {
    return Promise.reject("getData caught it", err);
  });
}
// using the function
getData()
  .then(console.log)
  .catch(err => {
    console.log("caught the error", err);
  });

async function getData() {
  try {
    return [await fetch("http://newfinds.com/foo"), await fetch("http://newfinds.com")];
  } catch (err) {
    return Promise.reject(err);
  }
}
// using the function
getData()
  .then(console.log)
  .catch(err => console.log("caught", err));
