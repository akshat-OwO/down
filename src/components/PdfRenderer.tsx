'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ChevronDown,
    ChevronUp,
    Loader2,
    RotateCw,
    Search,
} from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from 'react-resize-detector';
import SimpleBar from 'simplebar-react';
import { z } from 'zod';
import PdfFullscreen from './PdfFullscreen';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
    url: string;
}

const PdfRenderer: FC<PdfRendererProps> = ({ url }) => {
    const { toast } = useToast();

    const [numPages, setNumPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [renderedScale, setRenderedScale] = useState<number | null>(null);

    const isLoading = renderedScale !== scale;

    const CustomPageValidator = z.object({
        page: z
            .string()
            .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
    });

    type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TCustomPageValidator>({
        defaultValues: {
            page: '1',
        },
        resolver: zodResolver(CustomPageValidator),
    });

    const { width, ref, height } = useResizeDetector();

    const handlePageSubmit = ({ page }: TCustomPageValidator) => {
        setCurrentPage(Number(page));
        setValue('page', String(page));
    };

    return (
        <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
            <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        aria-label="previous page"
                        disabled={currentPage <= 1}
                        onClick={() => {
                            setCurrentPage((prev) =>
                                prev - 1 > 1 ? prev - 1 : 1
                            );
                            setValue('page', String(currentPage - 1));
                        }}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1.5">
                        <Input
                            {...register('page')}
                            className={cn(
                                'w-12 h-8',
                                errors.page && 'focus-visible:ring-red-700'
                            )}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(handlePageSubmit)();
                                }
                            }}
                        />
                        <p className="text-zinc-700 text-sm space-x-1">
                            <span>/</span>
                            <span>{numPages ?? 'x'}</span>
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        aria-label="next page"
                        disabled={
                            numPages === undefined || currentPage === numPages
                        }
                        onClick={() => {
                            setCurrentPage((prev) =>
                                prev + 1 > numPages! ? numPages! : prev + 1
                            );
                            setValue('page', String(currentPage + 1));
                        }}
                    >
                        <ChevronUp className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="gap-1.5"
                                aria-label="zoom"
                                variant="ghost"
                            >
                                <Search className="h-4 w-4" />
                                {scale * 100}%
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setScale(1)}>
                                100%
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(1.5)}>
                                150%
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(2)}>
                                200%
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(2.5)}>
                                250%
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="ghost"
                        aria-label="rotate 90 degrees"
                        onClick={() =>
                            setRotation((prev) => {
                                if (prev >= 270) {
                                    return 0;
                                } else {
                                    return prev + 90;
                                }
                            })
                        }
                    >
                        <RotateCw className="h-4 w-4" />
                    </Button>

                    <PdfFullscreen fileUrl={url} />
                </div>
            </div>
            <div className="flex-1 w-full max-h-screen">
                <SimpleBar
                    autoHide={false}
                    className="max-h-[calc(100vh-10rem)]"
                >
                    <div ref={ref} className='h-full'>
                        <Document
                            loading={
                                <div className="flex justify-center">
                                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                </div>
                            }
                            onLoadError={() => {
                                toast({
                                    title: 'Error loading pdf',
                                    description: 'Please try again later',
                                    variant: 'destructive',
                                });
                            }}
                            onLoadSuccess={({ numPages }) =>
                                setNumPages(numPages)
                            }
                            file={url}
                            className="max-h-full"
                        >
                            {isLoading && renderedScale ? (
                                <Page
                                    width={width ? width : 1}
                                    height={height ? height : 1}
                                    pageNumber={currentPage}
                                    scale={scale}
                                    rotate={rotation}
                                    key={'@' + renderedScale}
                                />
                            ) : null}

                            <Page
                                className={cn(isLoading ? 'hidden' : '')}
                                width={width ? width : 1}
                                height={height ? height : 1}
                                pageNumber={currentPage}
                                scale={scale}
                                rotate={rotation}
                                loading={
                                    <div className="flex justify-center">
                                        <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                    </div>
                                }
                                onRenderSuccess={() => setRenderedScale(scale)}
                                key={'@' + scale}
                            />
                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
};

export default PdfRenderer;
