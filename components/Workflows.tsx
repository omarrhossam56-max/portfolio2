"use client";

import ProjectGallery from "./ProjectGallery";

export default function Workflows() {
  return (
    <section
      id="workflows"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-12"
      style={{ background: "#0d0905" }}
    >
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(107, 31, 31, 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-40 w-[550px] h-[550px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(181, 128, 74, 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectGallery />
      </div>
    </section>
  );
}
