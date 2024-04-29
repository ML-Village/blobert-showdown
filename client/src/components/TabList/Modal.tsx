import { CustomFlowbiteTheme, Modal } from "flowbite-react";

const customModalThem: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "bg-orange-200/95 relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    popup: "border-b-0 p-2",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-700 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
};

interface RowModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function RowModal({ openModal, setOpenModal }: RowModalProps) {
    
  return (
    <div>
      <Modal
        theme={customModalThem}
        dismissible
        position="top-center"
        size="5xl"
        popup
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <div className="w-full py-2 px-4 pt-7 text-2xl font-bold">
            {/* {selectedBlobber.name} */}
            name
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-start">
            blobbers and stats
            <div className="w-full flex justify-between items-center">
              blobbers div
              {/* <div className="w-fit grid grid-cols-6 gap-2">
                {[
                  selectedBlobber.blob1,
                  selectedBlobber.blob2,
                  selectedBlobber.blob3,
                  selectedBlobber.blob4,
                  selectedBlobber.blob5,
                  selectedBlobber.blob6,
                ].map((blob, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img
                      className="h-16 rounded-lg border border-gray-800"
                      src={
                        customBlobertInfoObject[customBlobertArray[blob]]?.path
                      }
                    />
                  </div>
                ))}
              </div> */}
              stats div
              <div className="mr-8">
                <div className="flex flex-col items-end justify-center text-xl font-bold text-gray-800">
                  {/* <span>Total Games: {selectedBlobber.totalGames}</span> */}
                  {/* <span>Win Rate: {selectedBlobber.winRate}</span> */}
                </div>
              </div>
            </div>
            {/* current matches
            <div className="my-4 p-4 w-full h-[400px] border bg-gray-800 border-gray-400 rounded-lg">
              <CurrentMatchTable></CurrentMatchTable>
            </div> */}
            showdown challenge buttons
            <div className="mt-auto w-full flex justify-start items-center text-orange-200 font-medium gap-2">
              <button className="bg-[#664A44] px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white">
                Challenge Blobber to A ShowDown!
              </button>
              <button className="bg-[#664A44] px-4 py-2 rounded-lg hover:bg-blue-800/50">
                Nvm Me too Sked.
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
