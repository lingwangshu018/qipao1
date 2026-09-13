import React, { useState } from 'react';
import { AppConfig, ExportType } from '../types';
import { generateCSS } from '../utils/cssGenerator';
import { Copy, Check, Code, ShieldCheck, Download, FileText } from 'lucide-react';

interface CodeExportProps {
  config: AppConfig;
  exportType: ExportType;
  onSelectExportType: (type: ExportType) => void;
}

export const CodeExport: React.FC<CodeExportProps> = ({
  config,
  exportType,
  onSelectExportType,
}) => {
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('puff-theme.css');
  const [showFilenameInput, setShowFilenameInput] = useState(false);

  const code = generateCSS(config, exportType);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleDownload = () => {
    let finalName = fileName.trim();
    if (!finalName) finalName = 'bubble-theme.css';
    if (!finalName.endsWith('.css')) finalName += '.css';

    const blob = new Blob([code], { type: 'text/css;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', finalName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="code-export-card" className="bg-white rounded-xl p-4 border-2 border-black shadow-[3px_3px_0px_#000] mb-4">
      {/* 头部与导出方案选择 - Clean Minimalism */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-black" />
          <h2 className="text-xs font-black text-black uppercase tracking-wider">生成完整 CSS 代码 (全组件修复联动版)</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            id="export-type-select"
            value={exportType}
            onChange={(e) => onSelectExportType(e.target.value as ExportType)}
            className="text-xs font-black bg-[#f0f2f5] border-2 border-black rounded-lg px-3 py-1.5 text-black cursor-pointer shadow-[2px_2px_0px_#000] focus:outline-none"
          >
            <option value="xinyue">新月线上语聊模板 (全组件专属映射版)</option>
            <option value="puff_short">Puff 迷你短模板 (精简快速版)</option>
            <option value="puff">Puff 经典完整模板 (包含去背景与去重边框完整防御)</option>
            <option value="sully">Sully 全局定制模板 (彻底修复语音/转账卡)</option>
            <option value="float">Float 聊天室专用模板 (纯正 Float 类名规范)</option>
            <option value="link">LINK 线上页模板 (全套组件颜色联动)</option>
          </select>

          <button
            type="button"
            id="copy-code-btn"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-lg border-2 border-black transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制！' : '复制代码'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFilenameInput(!showFilenameInput)}
            className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-lg border-2 border-black bg-[#f0f2f5] hover:bg-black hover:text-white text-black transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            title="自定义文件名并下载 .css 文件"
          >
            <Download className="w-3.5 h-3.5" />
            <span>下载文件</span>
          </button>
        </div>
      </div>

      {/* 自定义文件名下载栏 */}
      {showFilenameInput && (
        <div className="flex items-center gap-2 mb-3 p-2.5 bg-[#f0f2f5] border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] animate-in fade-in duration-150">
          <FileText className="w-4 h-4 text-black shrink-0" />
          <span className="text-xs font-black text-black whitespace-nowrap">文件名:</span>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="如: my-puff-theme.css"
            className="flex-1 font-mono text-xs font-bold px-2 py-1 bg-white border border-black rounded focus:outline-none"
          />
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1 text-xs font-black px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white border border-black rounded shadow-[1px_1px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>确认下载</span>
          </button>
        </div>
      )}

      {/* 修复要点标签 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        <div className="bg-white border-2 border-black rounded-lg p-2.5 flex items-start gap-2 shadow-[2px_2px_0px_#000]">
          <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <div className="text-[11px] text-black leading-snug">
            <b className="font-black text-black">消除双层边框冲突：</b>
            针对父级气泡内含语音条或转账卡场景，自动卸除外层气泡 `border-image` 与宽度挤压限制。
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-lg p-2.5 flex items-start gap-2 shadow-[2px_2px_0px_#000]">
          <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <div className="text-[11px] text-black leading-snug">
            <b className="font-black text-black">语音条与转账卡独立切片：</b>
            为 `.sully-voice-bar` 及 `div[class*="w-64"]` 建立精准的左右互斥规则与独立九宫格拉伸。
          </div>
        </div>
      </div>

      {/* 代码预览区 */}
      <div className="relative bg-[#18181b] text-gray-100 rounded-lg p-3.5 overflow-hidden border-2 border-black shadow-[2px_2px_0px_#000]">
        <pre className="font-mono text-xs leading-relaxed max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
