"use client";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { wagmiContractConfig } from "./contracts";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Home() {
  const { address } = useAccount();

  const {
    data: hash,
    writeContract,
    isPending: writePending,
  } = useWriteContract();

  const [loadingButton, setLoadingButton] = useState(null);
  const [incrementValue, setIncrementValue] = useState(0);

  const {
    data: count,
    isPending,
    error,
    refetch,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCount",
    query: { enabled: !!address },
  });

  const handleCounter = async (action) => {
    if (
      action === "increaseValueBy" &&
      (incrementValue <= 0 || isNaN(incrementValue))
    ) {
      toast.error("Increment value must be a positive number greater than 0");
      return;
    }

    setLoadingButton(action);

    try {
      if (action === "increaseValueBy") {
        writeContract({
          ...wagmiContractConfig,
          functionName: "increaseValueBy",
          args: [parseInt(incrementValue)],
        });
      } else {
        writeContract({
          ...wagmiContractConfig,
          functionName:
            action === "increase"
              ? "increasedByOne"
              : action === "decrease"
              ? "decreaseByOne"
              : action === "reset"
              ? "resetCount"
              : "getCount",
        });
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed");
    }
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Transaction sent successfully");
      setIncrementValue(0)
    }
  }, [isSuccess]);

  if (isPending && address) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-black">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="w-4 h-4 bg-white rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="bg-primary h-screen grid font-[family-name:var(--font-geist-sans)] overflow-y-hidden">
      <div className="px-[15em] py-[2em]">
        <div className="w-full backdrop-blur-xl flex justify-between border-[1px] border-gray-300 p-4 rounded-lg items-center">
          <h3 className="text-white text-2xl font-bold">CounterApp</h3>
          <ConnectButton />
        </div>
        {address ? (
          <div className="min-w-2xl flex justify-center items-center">
            <div className="flex flex-col gap-5  mt-[10em] p-[2em] justify-center items-center">
              <h4 className="text-white text-2xl">Current count is:</h4>
              <h1 className="text-white text-[5em]">{count}</h1>
              <div className="flex gap-5">
                {["increase", "decrease", "reset", "get"].map((action) => (
                  <button
                    key={action}
                    className={`${
                      (writePending || isConfirming) && loadingButton === action
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white"
                    } px-4 py-3 rounded-md flex items-center justify-center min-w-[120px]`}
                    onClick={() => handleCounter(action)}
                    disabled={
                      (writePending || isConfirming) && loadingButton === action
                    }
                  >
                    {writePending && loadingButton === action ? (
                      <motion.div className="w-5 h-5 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                    ) : (
                      <span>
                        {isConfirming && loadingButton === action ? (
                          <span className="flex gap-2 items-center">
                            <motion.div className="w-4 h-4 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />{" "}
                            Confirming...
                          </span>
                        ) : (
                          action.charAt(0).toUpperCase() +
                          action.slice(1) +
                          " count"
                        )}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <input
                type="number"
                className="w-full p-3 bg-transparent ring-2 ring-white outline-none text-white rounded-lg"
                placeholder="Enter count increment"
                onChange={(e) => setIncrementValue(e.target.value)}
              />

              <button
                className={`${
                  (writePending || isConfirming) &&
                  loadingButton === "increaseValueBy"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white"
                } px-4 py-3 rounded-md flex items-center justify-center min-w-[120px]`}
                disabled={
                  (writePending || isConfirming) && loadingButton === "increaseValueBy"
                }
                onClick={() => handleCounter("increaseValueBy")}
              >
                {writePending && loadingButton === "increaseValueBy" ? (
                  <motion.div className="w-5 h-5 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                ) : (
                  <span>
                    {isConfirming && loadingButton === "increaseValueBy" ? (
                      <span className="flex gap-2 items-center">
                        <motion.div className="w-4 h-4 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />{" "}
                        Confirming...
                      </span>
                    ) : (
                      "Send"
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5  mt-[10em] p-[2em] justify-center items-center">
            <h4 className="text-white text-2xl">
              Please connect your wallet to continue
            </h4>
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}
