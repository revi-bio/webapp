export type WidgetType = 'profile' | 'link' | 'linkContainer';

export interface WidgetGenericSettings {
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    // might be not needed if we support argb background color
    opacity: string;
}

/** The actual widget placed on the bio site, NOT the widget definition */
export interface Widget {
    /** unique id for a widget */
    id: string;

    type: WidgetType;

    /** settings that every widget has */
    genericSettings: WidgetGenericSettings;

    /** widget-specific settings */
    specificSettings: { [key: string]: any };

    /** the index of the page the widget is on */
    page: number;

    /** the index of the widget on the page */
    position: number;
}
