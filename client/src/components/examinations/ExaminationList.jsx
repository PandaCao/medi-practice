import React, { useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlus, BsChevronDown } from 'react-icons/bs';
import { PERMISSIONS } from '../../config/permissions';
import PermissionGuard from '../common/PermissionGuard';
import ExaminationItem from './ExamintationItem';

const ITEMS_PER_PAGE = 3;

const ExaminationList = ({ examinations = [], onAdd, onEdit }) => {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Sort examinations by date (newest first) and memoize the result
    const sortedExaminations = useMemo(() => {
        return [...examinations].sort((a, b) => {
            return new Date(b.examination_date) - new Date(a.examination_date);
        });
    }, [examinations]);

    const visibleExaminations = sortedExaminations.slice(0, visibleCount);
    const hasMore = visibleCount < sortedExaminations.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <h5 className="mb-0 fw-bold text-primary">Přehled vyšetření</h5>
                <PermissionGuard permission={PERMISSIONS.EXAMINATION_CREATE}>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2"
                        onClick={onAdd}
                        style={{ cursor: 'pointer', zIndex: 1 }}
                    >
                        <BsPlus className="text-white" />
                        <span className="d-none d-sm-inline">
                            Přidat vyšetření
                        </span>
                        <span className="d-sm-none">Přidat</span>
                    </Button>
                </PermissionGuard>
            </div>
            <div>
                {visibleExaminations.length > 0 ? (
                    <>
                        {visibleExaminations.map((examination) => (
                            <ExaminationItem
                                key={examination.id}
                                examination={examination}
                                onEdit={onEdit}
                            />
                        ))}
                        {hasMore && (
                            <div className="text-center mt-3">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="d-inline-flex align-items-center gap-2"
                                    onClick={handleLoadMore}
                                >
                                    <BsChevronDown />
                                    Načíst další vyšetření
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-muted small mb-0">
                        Žádná vyšetření nejsou k dispozici.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ExaminationList;
