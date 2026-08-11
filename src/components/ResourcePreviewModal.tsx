import React from 'react';
import { X, Download, Play, FileText, CheckCircle } from 'lucide-react';
import { VideoResource, DownloadableResource } from '../types';

interface VideoModalProps {
  video: VideoResource | null;
  onClose: () => void;
}

export const VideoPreviewModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Play className="text-red-500 fill-red-500" size={20} />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {video.platform} • {video.channelName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl cursor-pointer transition-transform transform hover:scale-110 mb-4">
              <Play size={32} className="ml-1 fill-white" />
            </div>
            <h3 className="text-lg font-bold text-white max-w-lg mb-2">{video.title}</h3>
            <p className="text-xs text-gray-300 mb-4">{video.duration} • {video.views}</p>
            <a
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md transition-colors"
            >
              Watch Full Video on YouTube
            </a>
          </div>
        </div>

        <div className="p-6 bg-white">
          <h4 className="font-bold text-gray-900 mb-1">{video.title}</h4>
          <p className="text-sm text-gray-600">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

interface DocumentModalProps {
  document: DownloadableResource | null;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentModalProps> = ({ document: doc, onClose }) => {
  if (!doc) return null;

  const [downloaded, setDownloaded] = React.useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    // Simulate generating and downloading document
    const blob = new Blob([
      `EcoSort Educational Resource\nTitle: ${doc.title}\nFileType: ${doc.fileType}\n\nDescription:\n${doc.description}\n\nContent Highlights:\n${(doc.previewContent || []).join('\n')}`
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-200 uppercase">{doc.fileType}</span>
              <h3 className="text-lg font-bold leading-tight">{doc.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">{doc.description}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500 py-2 border-y border-gray-100">
            <span>Size: <strong>{doc.fileSize}</strong></span>
            <span>Total Downloads: <strong>{doc.downloadCount}</strong></span>
            <span>Format: <strong>Printable PDF / Text</strong></span>
          </div>

          {doc.previewContent && doc.previewContent.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Document Contents Preview
              </h4>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                {doc.previewContent.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-800">
                    <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs rounded-lg transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-colors"
          >
            <Download size={16} />
            {downloaded ? 'Downloaded Successfully!' : `Download File (${doc.fileSize})`}
          </button>
        </div>
      </div>
    </div>
  );
};
