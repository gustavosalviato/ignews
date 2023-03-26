import { useEffect, useState } from "react";

export function Async() {
  const [IsButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <span data-testid="hello-world">Hello world</span>
      {IsButtonVisible && <button>Button</button>}
    </div>
  );
}
