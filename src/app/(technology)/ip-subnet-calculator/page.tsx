"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function IPSubnetCalculator() {
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [subnetMask, setSubnetMask] = useState("24"); // CIDR notation is easiest for input

  const [result, setResult] = useState<{
    networkId: string;
    broadcast: string;
    firstHost: string;
    lastHost: string;
    totalHosts: number;
    usableHosts: number;
    maskString: string;
    wildcard: string;
    ipBinary: string;
    maskBinary: string;
    isValid: boolean;
    error: string;
  } | null>(null);

  useEffect(() => {
    calculateSubnet();
  }, [ipAddress, subnetMask]);

  const ipToNum = (ip: string) => {
    return (
      ip
        .split(".")
        .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
    );
  };

  const numToIp = (num: number) => {
    return `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${num & 255}`;
  };

  const numToBinaryStr = (num: number) => {
    return (
      num
        .toString(2)
        .padStart(32, "0")
        .match(/.{1,8}/g)
        ?.join(".") || ""
    );
  };

  const calculateSubnet = () => {
    // Basic IPv4 validation
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ipAddress)) {
      setResult({
        isValid: false,
        error: "Invalid IPv4 address format.",
      } as any);
      return;
    }

    const octets = ipAddress.split(".").map(Number);
    if (octets.some((o) => o < 0 || o > 255)) {
      setResult({
        isValid: false,
        error: "IP octets must be between 0 and 255.",
      } as any);
      return;
    }

    const cidr = parseInt(subnetMask, 10);
    if (isNaN(cidr) || cidr < 0 || cidr > 32) {
      setResult({
        isValid: false,
        error: "CIDR subnet must be between 0 and 32.",
      } as any);
      return;
    }

    const ipNum = ipToNum(ipAddress);
    // Create mask: ex: /24 -> 32-24=8, (0xFFFFFFFF << 8)
    // Bitwise shift operators in JS work on 32-bit INTs, so >>> 0 converts to unsigned
    const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardNum = ~maskNum >>> 0;

    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | wildcardNum) >>> 0;

    const firstHostNum = networkNum + 1;
    const lastHostNum = broadcastNum - 1;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;

    setResult({
      networkId: numToIp(networkNum),
      broadcast: numToIp(broadcastNum),
      firstHost: cidr >= 31 ? "N/A" : numToIp(firstHostNum),
      lastHost: cidr >= 31 ? "N/A" : numToIp(lastHostNum),
      totalHosts,
      usableHosts,
      maskString: numToIp(maskNum),
      wildcard: numToIp(wildcardNum),
      ipBinary: numToBinaryStr(ipNum),
      maskBinary: numToBinaryStr(maskNum),
      isValid: true,
      error: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 text-zinc-200">
      <h1 className="text-4xl font-extrabold mb-4 text-cyan-400 border-b border-zinc-800 pb-4 flex items-center">
        <span className="mr-3">🌐</span> IP Subnet Calculator
      </h1>
      <p className="mb-8 text-zinc-400 text-lg">
        Calculate network boundaries, broadcast addresses, and usable host
        ranges for IPv4 subnets instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Inputs */}
        <div className="md:col-span-1 border border-zinc-800 bg-zinc-950 p-6 rounded-xl space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
              IP Address
            </label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full rounded-lg border-2 border-zinc-800 bg-black p-3 focus:border-cyan-500 text-white font-mono shadow-inner outline-none transition"
              placeholder="192.168.1.1"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
              Subnet Mask (CIDR)
            </label>
            <div className="flex items-center group">
              <span className="bg-zinc-800 text-zinc-400 p-3 rounded-l-lg font-mono border-y border-l border-zinc-800 group-focus-within:border-cyan-500 transition">
                /
              </span>
              <input
                type="number"
                min="0"
                max="32"
                value={subnetMask}
                onChange={(e) => setSubnetMask(e.target.value)}
                className="w-full rounded-r-lg border-2 border-l-0 border-zinc-800 bg-black p-3 focus:border-cyan-500 text-white font-mono shadow-inner outline-none transition"
              />
            </div>
            {result?.maskString && (
              <p className="text-xs text-cyan-500 font-mono mt-2 pl-1">
                {result.maskString}
              </p>
            )}
          </div>
        </div>

        {/* Results Overview */}
        <div className="md:col-span-2 bg-zinc-800/50 rounded-xl border border-zinc-700/50 flex flex-col justify-center p-6 text-center">
          {result?.isValid ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                  Network Address
                </div>
                <div className="text-xl font-mono text-cyan-400">
                  {result.networkId}
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                  Broadcast Address
                </div>
                <div className="text-xl font-mono text-fuchsia-400">
                  {result.broadcast}
                </div>
              </div>
              <div className="col-span-2 bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg border-l-4 border-l-cyan-500 text-left flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                    Usable Host Range
                  </div>
                  <div className="text-lg font-mono text-white">
                    {result.firstHost}{" "}
                    <span className="text-zinc-500 mx-2">-</span>{" "},
                    {result.lastHost}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-cyan-400 drop-shadow-md">
                    {result.usableHosts.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                    Usable Hosts
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400 font-mono">{result?.error}</div>
          )}
        </div>
      </div>

      {/* Binary / Details View */}
      {result?.isValid && (
        <div className="bg-black/50 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-4 border-b border-zinc-800 pb-2">
            Technical Details
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">IP Binary:</span>
              <span className="text-zinc-300">{result.ipBinary}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Mask Binary:</span>
              <span className="text-zinc-300">{result.maskBinary}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Subnet Mask:</span>
              <span className="text-cyan-400">{result.maskString}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between pb-2">
              <span className="text-zinc-500">Wildcard Mask:</span>
              <span className="text-amber-400">{result.wildcard}</span>
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "IP Subnet Calculator",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="IPv4 Subnet Mask and CIDR Calculator"
          whatIsIt={
            <p>
              The <strong>IP Subnet Calculator</strong> parses a given IPv4
              address and its accompanying Classless Inter-Domain Routing (CIDR)
              mask to instantly map out the technical architecture of a local
              sub-network. It mathematically generates the exact Network ID,
              Broadcast Address, Wildcard Mask, and total Usable Host range.
            </p>
          }
          formula={
            <>
              <p>
                Subnetting fundamentally relies on translating human-readable IP
                addresses (like 192.168.1.1) into raw 32-bit binary strings (1s
                and 0s). The calculator uses Bitwise logic operators (AND, OR,
                NOT) to filter the IP address strictly against the binary subnet
                mask, instantly separating the "network" portion from the "host"
                portion.
              </p>
              <div className="bg-zinc-800 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-700 text-cyan-400">
                <p>
                  <strong>
                    Network ID = IP <span className="text-zinc-400">AND</span>{" "}
                    Subnet Mask
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>
                    Wildcard = <span className="text-zinc-400">NOT</span> Subnet
                    Mask
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>
                    Broadcast = Network ID{" "}
                    <span className="text-zinc-400">OR</span> Wildcard
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>Usable Hosts = (2 ^ Unmasked Bits) - 2</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's map out a tightly constrained office network targeting a
                `/28` subnet mask.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
                <li>
                  <strong>The Input:</strong> Base IP `10.0.0.0` with a `/28`
                  CIDR mask.
                </li>
                <li>
                  <strong>The Binary Shift:</strong> A `/28` mask means 28 bits
                  are reserved for the network, leaving exactly 4 bits for
                  computers.
                </li>
                <li>
                  <strong>Host Calculation:</strong> 2 to the power of 4 is 16
                  total IPs. Subtract 2 for the Network ID and Broadcast,
                  leaving 14 usable hosts.
                </li>
                <li>
                  <strong>Result:</strong> Your usable IP range is extremely
                  tight, from <strong>10.0.0.1 to 10.0.0.14</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-400">
              <li>
                <strong>Cloud Architecture (AWS/Azure):</strong> Defining
                Virtual Private Cloud (VPC) subnets. Cloud engineers must
                calculate exact CIDR blocks to segment databases from
                public-facing web servers without overlapping IP address spaces.
              </li>
              <li>
                <strong>Router Configuration:</strong> Setting up physical
                corporate firewalls and core switches safely requires
                understanding the exact binary boundary of a broadcast domain to
                prevent broadcast storming.
              </li>
              <li>
                <strong>Cybersecurity Audits:</strong> Penetration testers use
                exact CIDR definitions (like `192.168.0.0/16`) to cleanly map
                out scan boundaries for Nmap, ensuring they don't accidentally
                attack server targets out of scope.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why do we subtract 2 to find 'Usable Hosts'?",
              answer:
                "In IPv4, the very first IP in a subnet block is strictly reserved to identify the network itself (Network ID). The very last IP in the block is strictly reserved as the Broadcast address (which pings every device simultaneously). Thus, they cannot be assigned to individual laptops.",
            },
            {
              question: "What does CIDR notation like /24 mean?",
              answer:
                "CIDR (Classless Inter-Domain Routing) is shorthand. A `/24` simply means the first 24 bits (from left to right) out of the available 32 bits in an IPv4 address are locked to define the 'Network'. Only the remaining 8 bits are left open.",
            },
            {
              question: "What is a Wildcard Mask?",
              answer:
                "A wildcard mask is the exact inverse of a subnet mask (it flips every 1 to a 0). It is primarily used by Cisco routers in Access Control Lists (ACLs) to easily define which specific IP ranges a firewall should permit or deny.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator",
              desc: "Calculate exact network transmission times.",
            },
            {
              name: "Base Converter",
              path: "/base-converter",
              desc: "Convert numbers natively between binary, decimal, and hexadecimal.",
            },
            {
              name: "Base64 Encoder",
              path: "/base64-converter",
              desc: "Encode raw data securely for server transfers.",
            },
            {
              name: "Base64 Converter",
              path: "/base64-converter",
              desc: "Encode and decode data in Base64 format securely.",
            }]}
        />
      </div>
    </div>
  );
}
