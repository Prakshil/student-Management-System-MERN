import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import dashboardImg from "@/assets/images/image.png";

export function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden">
      <MacbookScroll
        title={
          <div className="flex flex-col items-center gap-4 py-2 mb-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Student Management System
            </h1>
            <p className="text-xl text-neutral-400 font-light max-w-2xl text-center mt-4">
              Streamline your educational workflow with powerful tools for tracking, managing, and optimizing student performance
            </p>
          </div>
        }
        src={dashboardImg}
        showGradient={false}
      />
    </div>
  );
}

export default MacbookScrollDemo;
