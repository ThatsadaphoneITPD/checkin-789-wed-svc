'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { iconsData } from './icons-data';

import { InputText } from 'primereact/inputtext';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import SVGLoader from '@/app/components/svg-loader';
import PageHeader from '@/app/components/page-header';

const pageHeader = {
  title: 'Icons',
  breadcrumb: [
    {
      name: 'Widgets',
    },
    {
      name: 'Icons',
    },
  ],
};

export default function IconsList() {
  const [searchText, setSearchText] = useState('');

  let iconItemsFiltered = [...iconsData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (searchText.length > 0) {
    iconItemsFiltered = iconsData.filter((item: any) => {
      const label = item.name;
      return (
        label.match(searchText.toLowerCase()) ||
        (label.toLowerCase().match(searchText.toLowerCase()) && label)
      );
    });
  }

  return (
    <>
      <PageHeaderWithSearch
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {iconItemsFiltered.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '20px',
          }}
        >
          {iconItemsFiltered.map((item, idx) => (
            <IconCard key={`${item.name}-${idx}`} {...item} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <>Found Not Thing</>
        </div>
      )}
    </>
  );
}

function PageHeaderWithSearch({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
    return () => {
      inputRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <InputText
        value={searchText}
        ref={inputRef}
        onChange={(e) => setSearchText(() => e.target.value)}
        placeholder={`Search among ${iconsData.length} icons`}
        style={{
          marginTop: '16px',
          width: '100%',
          maxWidth: '300px',
          padding: '10px',
        }}
      />
    </PageHeader>
  );
}

function IconCard({ name, file }: { name: string; file: string }) {
  const [isCopied, setCopied] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard(value: string) {
    copyToClipboard(value);
    toast.success(<b>{`Copied '${value}' to clipboard`}</b>);
    setCopied(() => true);
    setTimeout(() => {
      setCopied(() => false);
    }, 300);
  }

  return (
  <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', alignItems: 'center',  justifyContent: 'center' }} onClick={() => handleCopyToClipboard(name)}>
      <div style={{ color: "#1d39c4",  display: 'flex', height: '50px', width: '50px', alignItems: 'center', justifyContent: 'center',  borderRadius: '8px', transition: 'border 0.2s ease-in-out', borderColor: isCopied ? '#333' : 'transparent',borderWidth: '1px',  boxShadow: isCopied ? '0 0 3px 2px #333' : '#333',}}>
        <SVGLoader fileName={file} />
      </div>
      <div style={{ width: "8rem", marginTop: '8px', textAlign: 'center', fontSize: '13px', color: isCopied ? '#333' : '#666', fontWeight: isCopied ? 'bold' : 'normal', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',}} >
        {name}
      </div>
  </div>
  );
}
