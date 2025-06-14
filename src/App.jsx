function App() {
  return (
    <>
      <div>
        <div className="w-full py-2 mx-auto">
          <img src="/logo.png" className="mx-auto w-[150px] h-auto py-2" />
        </div>
        <div>
          <div
            className="relative h-64 r"
            style={{ backgroundImage: "url('/page-title.jpg')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                Search Your
                <br />
                Favorite Recipe
              </h1>
              <p className="mt-2 text-sm md:text-lg">
                A handful of simple ingredients typify the fresh, vibrant
                flavors of Greek cooking
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
