import { FaCut, FaUpload } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-[#101318] h-screen text-[#FCFBF8]">
      <main>
        <div className="flex items-center w-full justify-center py-5 border-b-2 border-gray-500/50">
          <div className="w-7xl flex items-center">
            <div className="bg-[#13161D] p-1 rounded-md">
              <FaCut size={24} />
            </div>
            <div>
              <p className="font-semibold text-2xl">Consensus Core</p>
              <p className="text-sm">
                Remove gaps and extract consensus core regions
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-7xl flex justify-between py-8">
            <div>
              <p>INPUT FILES</p>
              <div className="flex flex-col items-center justify-center border border-dashed p-6 rounded-lg border-gray-500/90">
                <input type="file" hidden />
                <FaUpload />
                <p>Drop MSA files here or click to browse</p>
                <p className="text-sm">
                  Supports FASTA, CLUSTAL, PHYLIP, Stockholm formarts
                </p>
              </div>
            </div>

            <div className="w-[28%]">
              <div>
                <p>Parameters</p>
                <div className="flex items-center justify-between">
                  <p>Gap proportion threshold</p>
                  <p>45%</p>
                </div>
                <input
                  type="range"
                  name=""
                  id=""
                  min={0}
                  max={100}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <p>Strict(0)</p>
                  <p>Permissive</p>
                </div>
                <div>
                  <p>Remove full-gap columns</p>
                </div>
                <div>
                  <p>Trim flanking regions</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Flanking threshold</p>
                  <p>45%</p>
                </div>
                <input type="range" name="" id="" className="w-full" />
              </div>

              <button>Process O files</button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full border-t-2 border-gray-500/50 py-2">
          <p className="text-sm">
            Processes FASTA, CLUSTAL, PHYLIP, and Stockholm formats. All
            processing runs locally in your browser.
          </p>
        </div>
      </main>
    </div>
  );
}
