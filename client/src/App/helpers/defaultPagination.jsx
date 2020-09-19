const defaultPagination = () => {
  const specs = {
    sizePerPageList: [
      {
        text: "15",
        value: 15,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "100",
        value: 100,
      }
    ],
  };
  console.log(specs);
  return specs;
};

export default defaultPagination;
