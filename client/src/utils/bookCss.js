export const bookCoverCss = {
  width: "114px",
  height: "174px",
  marginTop: "-20px",
  position: "relative",
  transform: "perspective(52em) rotateX(5deg) rotateZ(-16deg) skewY(8deg)",
  boxShadow:
    "-4px 1.7em 0.3em -45px rgb(0 0 0 / 5%), -1.6em 1.8em 0.9em -0.2em rgb(0 0 0 / 30%), 0.3em 1.9em 1.3em rgb(0 0 0 / 5%)",
  borderTopRightRadius: "0.4em",
  marginLeft: "80px",
};

export const bookBeforeStyle = {
  content: "",
  width: "105%",
  height: "105%",
  left: "-5%",
  zIndex: -1,
  backgroundRepeat: "no-repeat",
  backgroundImage: `
    linear-gradient(115deg, transparent 2.8%, #3f3f3f 3%, #3f3f3f 16%, transparent 16%),
    linear-gradient(125deg, transparent 10%, #3f3f3f 10%, #3f3f3f 17%, #222 46.8%, transparent 47%),
    linear-gradient(125deg, transparent 46%, rgba(0, 0, 0, 0.5) 46.5%, rgba(0, 0, 0, 0.25) 49%, transparent 53%),
    linear-gradient(to right, #444, #666),
    linear-gradient(#444, #444),
    linear-gradient(140deg, transparent 45%, #222 45%, #ccc 96.8%, rgba(170, 170, 170, 0) 97%)
  `,
  backgroundSize:
    "100% 100%, 100% 100%, 100% 100%, 100% 0.4em, 94% 0.2em, 100% 100%",
  backgroundPosition: "0 0, 0 0, 0 0, 0 95.8%, 0 100%, 0 0",
  position: "absolute",
};

export const bookAfterStyle = {
  content: "",
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundImage: `
    linear-gradient(to right, transparent 2%, rgba(0, 0, 0, 0.1) 3%, rgba(0, 0, 0, 0.1) 4%, transparent 5%),
    linear-gradient(-50deg, rgba(0, 0, 0, 0.1) 20%, transparent 100%),
    linear-gradient(-50deg, rgba(0, 0, 0, 0.2) 20%, transparent 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 20%, transparent 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 20%, transparent 100%)
  `,
  backgroundSize: "100% 100%, 2% 20%, 1% 20%, 2% 20%, 1% 20%",
  backgroundPosition: "0 0, 2.2% 100%, 3% 100%, 2.2% 0, 3% 0",
  position: "absolute",
  left: 0,
};
