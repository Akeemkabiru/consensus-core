"use client";

import { useRef, useState } from "react";
import { FaCut, FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const allowedExtensions = [
    "fa",
    "fasta",
    "clustal",
    "clu",
    "phy",
    "phylip",
    "sto",
    "stockholm",
  ];

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  };

  const isValidFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    return allowedExtensions.includes(ext);
  };

  const handleBrowse = () => fileInputRef.current?.click();

  const handleFileChange = (e: any) => {
    if (!e.target.files) return;
    validateAndSet(e.target.files);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    validateAndSet(e.dataTransfer.files);
  };

  const validateAndSet = (fileList: FileList) => {
    const validFiles: File[] = [];
    for (const file of fileList) {
      if (isValidFile(file)) {
        validFiles.push(file);
      } else {
        showError(`Invalid file: ${file.name}`);
      }
    }
    if (validFiles.length > 0) {
      setFiles(validFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#0B0D10] min-h-screen text-[#F6F6F7] font-sans">
      <main className="w-full flex flex-col">
        {/* HEADER */}
        <header className="w-full border-b border-white/10 bg-[#101317]/70 backdrop-blur-md py-5 flex justify-center">
          <div className="w-full max-w-7xl flex items-center gap-4 px-4 sm:px-6">
            <div className="bg-[#181C22] p-2 rounded-xl shadow-lg border border-white/10">
              <FaCut size={26} className="text-[#E3E4E8]" />
            </div>
            <div>
              <p className="font-semibold text-2xl sm:text-3xl tracking-tight">
                Consensus Core
              </p>
              <p className="text-sm text-white/60">
                Remove gaps and extract consensus core regions
              </p>
            </div>
          </div>
        </header>

        <section className="flex justify-center py-8 sm:py-10">
          <div className="w-full max-w-7xl px-4 sm:px-6 flex flex-col lg:flex-row gap-10 lg:gap-12">
            <div className="w-full lg:w-[55%]">
              <p className="text-lg font-semibold mb-4 tracking-wide">
                Input Files
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-600/20 border border-red-600 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div
                className="flex flex-col items-center justify-center border border-dashed border-white/15 bg-[#14181F] p-8 rounded-2xl cursor-pointer hover:border-white/30 transition"
                onClick={handleBrowse}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  hidden
                  multiple
                  accept=".fa,.fasta,.clustal,.clu,.phy,.phylip,.sto,.stockholm"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <div className="flex flex-col items-center gap-4">
                  <div className="bg-[#1B2027] p-5 rounded-2xl border border-white/10 shadow-md">
                    <FaUpload className="text-3xl text-white/70" />
                  </div>
                  <p className="text-base font-medium text-center">
                    Drop MSA files here or click to browse
                  </p>
                  <p className="text-xs text-white/50 text-center">
                    Supports FASTA, CLUSTAL, PHYLIP, Stockholm formats
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-6 bg-[#14181F] border border-white/10 p-4 rounded-2xl shadow-inner">
                  <p className="text-sm text-white/60 mb-3">Uploaded Files:</p>

                  <ul className="space-y-3">
                    {files.map((file, i) => (
                      <li
                        key={i}
                        className="group bg-[#1A1F27] p-3 rounded-xl border border-white/10 shadow-sm flex justify-between items-center transition hover:bg-[#232932]"
                      >
                        <span className="truncate max-w-[80%]">
                          {file.name}
                        </span>

                        <button
                          onClick={() => removeFile(i)}
                          className="opacity-0 group-hover:opacity-100 transition bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
                        >
                          <IoClose size={18} className="text-white" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full lg:w-[45%] bg-[#14181F] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-lg font-semibold mb-6 tracking-wide">
                Parameters
              </p>

              <div className="mb-8">
                <div className="flex justify-between text-sm mb-1">
                  <p>Gap proportion threshold</p>
                  <p className="text-white/70">45%</p>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  className="w-full accent-white h-2 rounded-lg bg-[#1C2129]"
                />

                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <p>Strict (0)</p>
                  <p>Permissive</p>
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-white" />
                  <span className="text-sm">Remove full-gap columns</span>
                </label>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-white" />
                  <span className="text-sm">Trim flanking regions</span>
                </label>
              </div>

              <div className="mb-10">
                <div className="flex justify-between text-sm mb-1">
                  <p>Flanking threshold</p>
                  <p className="text-white/70">45%</p>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  className="w-full accent-white h-2 rounded-lg bg-[#1C2129]"
                />
              </div>

              <button className="w-full py-3 rounded-xl bg-white text-black font-semibold shadow-xl hover:bg-white/90 active:scale-[0.98] transition">
                Process {files.length} {files.length === 1 ? "file" : "files"}
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/10 py-4 flex justify-center px-4">
          <p className="text-xs text-white/40 text-center">
            Processes FASTA, CLUSTAL, PHYLIP, and Stockholm formats. All
            processing runs locally in your browser.
          </p>
        </footer>
      </main>
    </div>
  );
}
