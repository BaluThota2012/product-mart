import AppRoutes from "./AppRoutes";
import Dashboard from "./components/Dashboard";
import NavTab from "./components/NavTab";

function App() {
  return (
    <div className="min-h-full h-full w-full">
      <NavTab />
      <main className='relative'>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 overflow-auto top-10">
              <AppRoutes />
          </div>
        </main>
    </div>
  );
}

export default App;
